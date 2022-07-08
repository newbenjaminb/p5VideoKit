export let a_ = {
  app_ver: 'Present?v=35 ',
  store_ver: '2',
  store_name: 'Store-A',
  store_prefix: 'v',
  ui: {
    setting: '',
    back_color: 200,
    room_name: 'Dice-Play-1',
    patch_layout: 'Single',
    canvas_size: '960x540',
    capture_size: '480x270',
    render_size: 'Canvas',
    chat_name: 'jht',
    chat_chk: 0,
    live_index: 0,
    live_chk: 0,
    patches: [{ eff_src: { ipatch: 0, imedia: 1, eff_label: 'show' } }],
    mediaDiv_states: [],
    urects_lock: 0,
    urects_count: 0,
    canvas_resize_ref: '',
    canvas_data_chk: 0,
  },
  patch_instances: [],
  canvas_size_lock: 0,
  hideui: 0, // Default is to hide using with s= settings
  chat_name: '', // chat name from url param c
  settings: [],
};
// let a_.settings = [];
// let a_.app_ver = 'Present?v=35 ';
// let a_.store_ver = '2';
// let a_.store_name = 'Store-A';
// let a_.store_prefix = 'v';
// let a_.ui = {
// let a_.patch_instances = [];
// let a_.canvas_size_lock = 0;
// let a_.hideui = 0; // Default is to hide using with s= settings
// let a_.chat_name; // chat name from url param c
