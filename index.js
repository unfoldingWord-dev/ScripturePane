import Container from './src/Container';
import {connectTool} from 'tc-tool';

const NAMESPACE = 'ScripturePane';

export default {
  name: NAMESPACE,
  container: connectTool()(Container)
};
