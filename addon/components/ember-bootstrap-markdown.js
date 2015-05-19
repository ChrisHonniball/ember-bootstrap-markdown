import Ember from 'ember';
import layout from '../templates/components/ember-bootstrap-markdown';

export default Ember.Component.extend({
  layout: layout,
  
  classNames: ['ember-bootstrap-markdown'],
  
  ////////////////
  //! Variables //
  ////////////////
  
  /*
   * An action that is taken when the 'apply' button is clicked.
   */
  applyAction: "",
  
  /*
   * The value
   */
  value: "",
  
  /*
   * Holds the previous value of the textarea while editing.
   */
  previousValue: "",
  
  /*
   * Holds the selected text while editing.
   */
  selection: "",
  
  /*
   * Undo history array that holds previous values while editing content.
   */
  undoHistory: Ember.A(),
  
  btns: 'heading,bold,italic,quote,link,image,list-ol,list-ul',
  
  /*
   * Builds toolbar out of the supplied string of buttons.
   */
  toolbarBtns: Ember.computed('btns', function() {
    var that = this,
      btns = that.get('btns').split(','),
      toolbarBtns = [],
      btnGroups = [],
      formattingOpts = that.get('_formattingOpts');
    
    btns.forEach(function(type) {
      if(!btnGroups[formattingOpts[type].group]) {
        btnGroups[formattingOpts[type].group] = [];
      }
      btnGroups[formattingOpts[type].group].push(formattingOpts[type]);
    });
    
    btnGroups.forEach(function(btn) {
      toolbarBtns.push(Ember.A(btn));
    });
    
    return Ember.A(toolbarBtns);
  }),
  
  /*
   * Default formats supplied with the component.
   */
  _formattingOpts: {
    'heading': {
      regex: '### $1',
      group: 1,
      style: 'heading',
      iconClass: 'fa-header'
    },
    'bold': {
      regex: '**$1**',
      group: 2,
      style: 'bold',
      iconClass: 'fa-bold'
    },
    'italic': {
      regex: '*$1*',
      group: 2,
      style: 'italic',
      iconClass: 'fa-italic'
    },
    'quote': {
      regex: '> $1',
      group: 3,
      style: 'quote',
      iconClass: 'fa-quote-right'
    },
    'link': {
      regex: '[$1]({{result}})',
      group: 4,
      style: 'link',
      iconClass: 'fa-link',
      prompt: 'Enter your link address. Include http://.'
    },
    'image': {
      regex: '![$1]({{result}})',
      group: 4,
      style: 'image',
      iconClass: 'fa-image',
      prompt: 'Enter the image URL'
    },
    'list-ol': {
      regex: '1. $1',
      group: 5,
      style: 'list-ol',
      iconClass: 'fa-list-ol'
    },
    'list-ul': {
      regex: '* $1',
      group: 5,
      style: 'list-ul',
      iconClass: 'fa-list-ul'
    }
  },
  
  //////////////////////////
  //! Computed Properties //
  //////////////////////////
  
  /*
   * Generated textarea ID for the instance.
   */
  textareaId: Ember.computed('elementId', function() {
    return this.get('elementId') + '-editor';
  }),
  
  /*
   * The generated HTML from the value.
   */
  previewHTML: Ember.computed('value', function() {
    var that = this,
      value = that.get('value');
    
    return (value) ? markdown.toHTML(value) : "";
  }),
  
  /*
   * Flag that tells if there are undo steps that can be performed.
   */
  noUndo: Ember.computed('undoHistory.length', function() {
    return (this.get('undoHistory.length') < 1) ? true : false;
  }),
  
  ///////////////////
  //! Ember Events //
  ///////////////////
  
  
  /*
   * Binds all the events to the textarea.
   */
  didInsertElement: function() {
    var that = this;
    
    that.$('.ember-bootstrap-markdown-textarea').on('blur', Ember.$.proxy(that.handleTextareaBlur, that));
    that.$('.ember-bootstrap-markdown-textarea').on('keyup input', Ember.$.proxy(that.handleTextareaSize, that));
    
    that.send('hideEditor');
    that.send('showPreview');
  },
  
  /*
   * Unbinds all events.
   */
  willDestroyElement: function() {
    var that = this;
    
    that.$('.ember-bootstrap-markdown-textarea').off('blur');
    that.$('.ember-bootstrap-markdown-textarea').off('keyup input');
  },
  
  ///////////////////////
  //! Custom Functions //
  ///////////////////////
  
  /*
   * Gets the selection from the textarea on blur.
   * This enables the buttons to perform actions on the selection.
   */
  handleTextareaBlur: function(){
    var that = this,
      textComponent = document.getElementById(that.get('textareaId')),
      selection, startPos, endPos;
    
    startPos = textComponent.selectionStart;
    endPos = textComponent.selectionEnd;
    selection = textComponent.value.substring(startPos, endPos);
    
    that.setProperties({
      startPos: startPos,
      endPos: endPos,
      selection: selection
    });
  },
  
  /*
   * Auto resizes the textarea based on the value length.
   */
  handleTextareaSize: function() {
    var that = this,
      textarea = that.$('.ember-bootstrap-markdown-textarea');
    textarea.css('height', 'auto').css('height', document.getElementById(that.get('textareaId')).scrollHeight + 5);
  },
  
  //////////////
  //! Actions //
  //////////////
  
  actions: {
    /*
     * Applies the style to text based on the regex sent.
     * @param regex The supplied regular expression that handles the replacement.
     * @param promptText Supplied text for a standard prompt dialog.
     */
    applyStyle: function(regex, promptText){
      var that = this, result,
        value = that.get('value'),
        selection = that.get('selection');
      
      if(!selection){
        alert('You must select text to apply a style!');
        return false;
      }
      
      if(promptText) {
        result = prompt(promptText);
        
        if(!result) {
          return false;
        }
        
        regex = regex.replace('{{result}}', result);
      }
      
      that.send('addUndoStep', value);
      
      var newStr = selection.replace(/^(.*)$/gm, regex),
        newValue = value.substr(0, that.get('startPos')) + newStr + value.substr(that.get('endPos'), value.length),
        newCursorPos = that.get('startPos') + newStr.length,
        strOffset = newStr.length - that.get('selection').length;
      
      that.setProperties({
        selection: '',
        value: newValue,
        newCursorPos: newCursorPos
      });
      
      that.send('setCursor', that.get('endPos') + strOffset);
    },
    
    /*
     * Sets the cursor location in the texterea.
     * @param pos The desired cursor possition.
     */
    setCursor: function(pos) {
      var that = this,
        ctrl = document.getElementById(that.get('textareaId'));
      
      if(ctrl.setSelectionRange) {
        ctrl.focus();
        Ember.run.next(that, function() {
          ctrl.setSelectionRange(pos, pos);
          that.handleTextareaSize();
        });
      } else if(ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
        that.handleTextareaSize();
      }
    },
    
    /*
     * Hides all the editor components.
     */
    hideEditor: function() {
      var that = this;
      
      that.$('.ember-bootstrap-markdown-editor').hide();
      that.$('.ember-bootstrap-markdown-toolbar').hide();
      that.$('.ember-bootstrap-markdown-footer').hide();
    },
    
    /*
     * Shows all the editor components.
     */
    showEditor: function() {
      var that = this;
      
      that.$('.ember-bootstrap-markdown-editor').show();
      that.$('.ember-bootstrap-markdown-toolbar').show();
      that.$('.ember-bootstrap-markdown-footer').show();
    },
    
    /*
     * Hides the HTML preview.
     */
    hidePreview: function() {
      var that = this;
      
      that.$('.ember-bootstrap-markdown-preview').hide();
    },
    
    /*
     * Shows the HTML preview.
     */
    showPreview: function() {
      var that = this;
      
      that.$('.ember-bootstrap-markdown-preview').show();
    },
    
    /*
     * Applies the changes, hides the editor, and shows the HTML preview.
     * Also sends the `applyAction` if one is set.
     */
    apply: function() {
      var that = this;
      
      that.send('hideEditor');
      that.send('showPreview');
      that.send('clearUndo');
      
      if(that.get('applyAction')) {
        that.sendAction(that.get('applyAction'));
      }
    },
    
    /*
     * Puts the component into edit mode.
     */
    edit: function() {
      var that = this;
      
      that.send('hidePreview');
      that.send('showEditor');
      
      that.set('previousValue', that.get('value'));
    },
    
    /*
     * Adds a step to the undo array.
     * @param value The value that is to be saved as an undo step.
     */
    addUndoStep: function(value) {
      var that = this,
        undoHistory = that.get('undoHistory');
      
      undoHistory.pushObject(value);
      
      that.set('undoHistory', undoHistory);
    },
    
    /*
     * Clears out the undo array.
     */
    clearUndo: function() {
      var that = this;
      
      that.set('undoHistory', Ember.A());
    },
    
    /*
     * Reverts the value to a previous value based on the undo array.
     */
    undo: function() {
      var that = this,
        undoHistory = that.get('undoHistory').toArray();
      
      if(undoHistory.length === 0){
        alert('No more steps to undo.');
        return false;
      }
      
      var restoreValue = undoHistory.pop();
      
      that.setProperties({
        undoHistory: Ember.A(undoHistory),
        value: restoreValue
      });
    },
    
    /*
     * Reverts the value to the previous value that was present when editing began.
     */
    discard: function() {
      var that = this;
      
      that.set('value', that.get('previousValue'));
      
      that.send('clearUndo');
      that.send('hideEditor');
      that.send('showPreview');
    }
  }
});
