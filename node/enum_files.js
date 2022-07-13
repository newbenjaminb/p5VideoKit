import pkg from 'fs-extra';
const { lstatSync, readdirSync } = pkg;
import { join } from 'path';

// list all non-directories in a list of files
export default function enum_files(root_path, files) {
  files = files.concat();
  let nfiles = [];
  // console.log('files', files);
  // console.log('files.length', files.length);
  for (let index = 0; index < files.length; index++) {
    let afile = files[index];
    // console.log('afile', afile);
    if (afile.substring(0, 1) == '.' && !afile.substring(0, 2) == './') continue;
    const fpath = join(root_path, afile);
    // console.log('fpath', fpath);
    if (!lstatSync(fpath).isDirectory()) {
      nfiles.push(afile);
      continue;
    }
    let dfiles = readdirSync(fpath);
    if (!dfiles) {
      console.log('readdirSync no files', fpath);
      continue;
    }
    for (let dfile of dfiles) {
      if (dfile.substring(0, 1) == '.') continue;
      let nfile = join(afile, dfile);
      files.push(nfile);
    }
  }
  return nfiles;
}
