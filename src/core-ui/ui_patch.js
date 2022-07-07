function ui_patch_layout() {
  let div = ui_div_empty('ipatch_layout');
  div.child(createSpan('Layout: '));
  {
    let aSel = createSelect();
    div.child(aSel);
    aSel.option('Single');
    aSel.option('2x1');
    aSel.option('2x2');
    aSel.option('2x3');
    aSel.option('3x2');
    aSel.option('3x3');
    aSel.option('3x1');
    aSel.option('4x4');
    aSel.selected(a_ui.patch_layout);
    aSel.changed(function () {
      let val = this.value();
      // console.log('ui_patch_layout', val);
      a_ui_set('patch_layout', val);
      pad_layout_update();
      ui_reset();
    });
  }
  ui_backcolor(div);

  div.child(createSpan(' Store: '));
  {
    let aSel = createSelect();
    div.child(aSel);
    aSel.option('Store-A');
    aSel.option('Store-B');
    aSel.option('Store-C');
    aSel.option('Store-D');
    aSel.selected(a_store_name);
    aSel.changed(function () {
      let val = this.value();
      store_name_update(val);
    });
  }
  {
    let aBtn = createButton('Export').mousePressed(function () {
      store_export_json();
    });
    div.child(aBtn);
  }
  {
    let aBtn = createButton('URL').mousePressed(function () {
      store_export_url();
    });
    div.child(aBtn);
  }
  div.child(createSpan(' Setting: '));
  {
    let aSel = createSelect();
    div.child(aSel);
    // console.log('a_ui.setting', a_ui.setting);
    let sii = 0;
    for (let ii = 0; ii < a_settings.length; ii++) {
      let ent = a_settings[ii];
      aSel.option(ent.setting, ii);
      // console.log('ii', ii, 'label', ent.label);
      if (ent.setting === a_ui.setting) {
        sii = ii;
      }
    }
    aSel.selected(sii);
    aSel.changed(function () {
      let ii = parseFloat(this.value());
      let ent = a_settings[ii];
      store_restore_from(ent);
    });
  }
  createElement('br');
}

function ui_patch_buttons() {
  createButton('Add Patch').mousePressed(function () {
    let newPatch = { eff_src: { ipatch: 0, imedia: 1, eff_label: 'show' } };
    patch_add(newPatch);
  });
  // createButton('Remove Patch').mousePressed(function () {
  //   patch_remove_last();
  // });
  createElement('br');
}

// Rebuild dynamic elements of ui
function ui_refresh() {
  if (a_hideui) return;
  ui_live_selection();
  ui_patch_eff_panes();
}

// Write out all patches to local storage
function ui_patch_save_all() {
  a_ui_set('patches', a_ui.patches);
}

// Write out all patches to local storage
// and reset given patch
function ui_patch_update(aPatch) {
  // console.log('ui_patch_update');
  a_ui_set('patches', a_ui.patches);
  if (!aPatch) return;
  let ipatch = aPatch.eff_src.ipatch;
  // console.log('ui_patch_update ipatch', ipatch);
  let inst = a_patch_instances[ipatch];
  // console.log('ui_patch_update inst', inst);
  if (inst && inst.remove_eff) {
    inst.remove_eff();
  }
  a_patch_instances[ipatch] = null;
}

function pad_layout_update() {
  let layout;
  // console.log('pad_layout_update a_ui.canvas_resize_ref |' + a_ui.canvas_resize_ref + '|');
  if (a_ui.canvas_resize_ref) {
    pads_resize_set_scale();
  } else {
    if (a_ui.urects_lock) {
      console.log('pad_layout_update a_ui.urects_lock');
      return;
    }
    layout = new pad_layout();
  }
  let urects_count = 0;
  let urect;
  for (let ipatch = 0; ipatch < a_ui.patches.length; ipatch++) {
    let uiPatch = a_ui.patches[ipatch];
    if (uiPatch) {
      let eff_src = uiPatch.eff_src;
      if (eff_src.ipatch != ipatch) {
        // ipatch change due to deletes
        console.log('!!@ eff_src.ipatch', eff_src.ipatch, 'ipatch', ipatch);
        eff_src.ipatch = ipatch;
      }
      if (layout) {
        urect = layout.next();
      } else if (eff_src.urect_ref) {
        urect = Object.assign({}, eff_src.urect_ref);
        console.log('pad_layout_ assign pad', JSON.stringify(urect));
        pads_resize_pad(urect);
      } else {
        // !!@ Error no urects_ref
        console.log('!!@ pad_layout_update urects_ref missing ipatch', ipatch, 'uiPatch', JSON.stringify(uiPatch));
      }
      eff_src.urect = urect;
      urects_count++;
    }
    // console.log('pad_layout_update uiPatch', JSON.stringify(uiPatch));
  }
  a_ui_set('patches', a_ui.patches);
  a_ui_set('urects_count', urects_count);
  // pads_resize_save();
}

function pads_resize_set_scale() {
  let refsz = str_to_width_height(a_ui.canvas_resize_ref);
  let tosz = str_to_width_height(a_ui.canvas_size);
  a_ui.urects_scale = tosz.width / refsz.width;
  console.log('pads_resize_set_scale a_ui.canvas_resize_ref', a_ui.canvas_resize_ref);
  console.log('pads_resize_set_scale a_ui.canvas_size', a_ui.canvas_size);
  console.log('pads_resize_set_scale urects_scale', a_ui.urects_scale);
}

function pads_resize_pad(urect) {
  for (let prop in urect) {
    urect[prop] = Math.floor(urect[prop] * a_ui.urects_scale);
  }
}