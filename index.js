import Container from './src/Container';
import {connectTool} from 'tc-tool';
import path from 'path';

const NAMESPACE = 'ScripturePane';
const LOCALE_DIR = path.join(__dirname, './locale');

export default {
  name: NAMESPACE,
  container: connectTool(LOCALE_DIR)(Container)
};
