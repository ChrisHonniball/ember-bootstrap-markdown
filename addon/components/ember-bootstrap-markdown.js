/* global marked */

import Ember from 'ember';
import layout from '../templates/components/ember-bootstrap-markdown';

export default Ember.Component.extend({
  layout: layout,
  
  classNames: ['ember-bootstrap-markdown'],

  classNameBindings: ['highlight:bg-warning'],
  
  ////////////////
  //! Variables //
  ////////////////
  
  /*
   * An action that is taken when the 'apply' button is clicked.
   */
  action: "",
  
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

  highlight: false,
  
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
      regex: '## $1',
      requireSelection: false,
      group: 1,
      style: 'heading',
      tooltip: 'Add Heading',
      iconClass: 'fa-header'
    },
    'bold': {
      regex: '**$1**',
      requireSelection: true,
      group: 2,
      style: 'bold',
      tooltip: 'Make Selection Bold',
      iconClass: 'fa-bold'
    },
    'italic': {
      regex: '*$1*',
      requireSelection: true,
      group: 2,
      style: 'italic',
      tooltip: 'Make Selection Italic',
      iconClass: 'fa-italic'
    },
    'quote': {
      regex: '> $1',
      requireSelection: false,
      group: 3,
      style: 'quote',
      tooltip: 'Add Quoted Text',
      iconClass: 'fa-quote-right'
    },
    'link': {
      regex: '[$1]({{result}})',
      requireSelection: true,
      group: 4,
      style: 'link',
      tooltip: 'Make Selection a Link',
      iconClass: 'fa-link',
      prompt: 'Enter your link address. Include http://.'
    },
    'image': {
      regex: '![$1]({{result}})',
      requireSelection: false,
      group: 4,
      style: 'image',
      tooltip: 'Add Embedded Image',
      iconClass: 'fa-image',
      prompt: 'Enter the image URL'
    },
    'list-ol': {
      regex: '1. $1',
      requireSelection: false,
      group: 5,
      style: 'list-ol',
      tooltip: 'Add Ordered List',
      iconClass: 'fa-list-ol'
    },
    'list-ul': {
      regex: '* $1',
      requireSelection: false,
      group: 5,
      style: 'list-ul',
      tooltip: 'Add Bulletted List',
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
    
    return (value) ? marked(value) : "";
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
    that.$('.ember-bootstrap-markdown-preview').on('click', 'a', Ember.$.proxy(that.handlePreviewLinkClick, that));
    
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
    that.$('.ember-bootstrap-markdown-preview').off('click', 'a');
    
    that.$('.ember-bootstrap-markdown-toolbar .btn').tooltip('destroy');
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
  
  handlePreviewLinkClick: function(e) {
    var that = this,
      href = e.currentTarget.href;
    
    // Handle the link internally
    e.preventDefault();
    e.stopPropagation();
    
    bootbox.dialog({
      backdrop: true,
      title: "You clicked a link",
      message: '<p><strong>Link destination:</strong> ' + href + '</p><p>Please select what you would like to do...</p>',
      closeButton: false,
      buttons: {
        no: {
          label: "cancel",
          className: "btn-default",
          callback: function() {
            e.stopPropagation();
          }
        },
        edit: {
          label: "Edit Section Content",
          className: "btn-info",
          callback: function() {
            that.send('edit');
          }
        },
        yes: {
          label: "Visit Link in a New Window",
          className: "btn-primary",
          callback: function() {
            window.open(href, '_blank');
          }
        }
      }
    });
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
    applyStyle: function(regex, requireSelection = false, promptText = null){
      let that = this, promise,
        value = that.get('value'),
        selection = that.get('selection');
      
      /* */
      console.log(
        "%c%s#applyStyle args: %O",
        "color: purple", // http://www.w3schools.com/html/html_colornames.asp
        that.toString(),
        arguments
      );
      //*/
      
      if(!selection && requireSelection){
        bootbox.dialog({
          backdrop: true,
          title: "Please make a text selection",
          message: 'You must select text to apply this style.',
          closeButton: false,
          buttons: {
            yes: {
              label: "OK",
              className: "btn-primary",
              callback: function() {
                
              }
            }
          }
        });
        return false;
      }
      
      promise = new Ember.RSVP.Promise(function(resolve, reject) {
        if(promptText) {
          
          bootbox.prompt({
            backdrop: true,
            title: promptText,
            callback(result) {
              if(!result) {
                reject();
              }
              
              regex = regex.replace('{{result}}', result);
              resolve(regex);
            }
          });
        } else {
          resolve(regex);
        }
      }).then(function(regex) {
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
      }, function() {
        // Do nothing...
      });
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
      
      that.$('.ember-bootstrap-markdown-toolbar .btn').tooltip('destroy');
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
      that.$('.ember-bootstrap-markdown-toolbar .btn').tooltip({
        container: 'body'
      });
      that.handleTextareaSize();
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
     * Also sends the `action` if one is set.
     */
    apply: function() {
      var that = this;
      
      that.send('hideEditor');
      that.send('showPreview');
      that.send('clearUndo');
      
      if(that.attrs.apply) {
        that.attrs.apply();
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
