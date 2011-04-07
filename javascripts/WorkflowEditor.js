Ext.namespace("Ext.agilebench");

Ext.agilebench.WorkflowStatesEditor = Ext.extend(Ext.DataView, {
  cls: 'x-workflow-editor',
//  itemSelector: 'div.workflow-state-and-arrow',
  itemSelector: 'div.viewTestEl2',
  itemEditorSelector: '.state',
  overClass:'x-view-over',

  // private
  inlineEditorField: null,
  inlineEditor: null,

  // private
  initComponent: function() {
    Ext.apply(this, {
      store: new Ext.data.JsonStore({
        idProperty: "id",
        fields: this.fields,
        data: [{"workflow_state_display":"Todo","workflow_state_order":1,"workflow_state":"todo","id":10},{"workflow_state_display":"In Progress","workflow_state_order":2,"workflow_state":"in_progress","id":11},{"workflow_state_display":"In Testing","workflow_state_order":3,"workflow_state":"in_testing","id":2755},{"workflow_state_display":"Done","workflow_state_order":4,"workflow_state":"done","id":12}],
        sortInfo: {field: 'workflow_state_order', direction: 'ASC'}
      })
    });

    Ext.agilebench.WorkflowStatesEditor.superclass.initComponent.call(this);

//    Ext.util.Observable.capture(this.store, function (e){console.info("store: " + e)});
//    Ext.util.Observable.capture(this, function (e){console.info("dataview: " + e)});
  },

  // force the template to only be rendered with the entire recordset, otherwise
  // strange behaviour will occur.
  tpl : new Ext.XTemplate(
//    '<div id="floatContainer" class="floatContainer">',
    '<tpl for=".">',
      '<tpl if="xindex == xcount">',
        '<div class="" id="add-button">',
          '<div class="workflow-display add-button">Add</div>',
          '<div class="arrow">',
            '&#8594;',   // &#8595;  down arrow
          '</div>',
        '</div>',
      '</tpl>',
      '<div id="wfs-{id}" class="viewTestEl2 node {[xindex == 1 ? "first" : (xindex == xcount ? "last" : "")]}">',
        '<div class="workflow-display">',
    '<tpl if="xindex &gt; 1 && xindex < xcount">',
          '<div class="handle">',
            '<div class="close-button"><img src="images/closeButtons.png"></div>',
          '</div>',
    '</tpl>',
          '<div class="state">',
            '{workflow_state_display}',
          '</div>',
          '<div class="x-clear"></div>',
        '</div>',
       // When the item is dragged, xcount is alway 1 (for 1 items selcted)
        '<tpl if="xindex < xcount || xcount == 1">',
          '<div class="arrow">',
            '&#8594;',   // &#8592;  for right arrow
          '</div>',
        '</tpl>',
      '</div>',
    '</tpl>',
    '<div class="x-clear"></div>',
    '<div id="save-workflow-button"></div>',
//    '</div>',
    {
      compiled: true
    }
  )
});

Ext.reg('workflowstateeditor', Ext.agilebench.WorkflowStatesEditor);

Ext.agilebench.WorkflowEditor = Ext.extend(Ext.Panel, {
  saveWorkflowButton: null,

  initComponent: function(config) {
    Ext.apply(this, {
      items: [{
        bodyCssClass: 'summary workflow-editor',
        html: '<h1>Workflow Editor</h1>'
      },{
        xtype: 'workflowstateeditor',
        ref: 'workflowstateeditor',
        style: {
          marginLeft: '40px',
          marginRight: '40px'
        },
        url: this.url,
        fields: ["id", "workflow_state", "workflow_state_order", "workflow_state_display"]
      }],

      buttonAlign: 'center',

      buttons: [{
        text: 'Save Workflow',
        ref: 'saveWorkflowButton',
        disabled: 'true',
        scope: this,
        handler: this.sendWorkflowChangesToServer
      }]
    });

    Ext.agilebench.WorkflowEditor.superclass.initComponent.call(this);
  },
});
