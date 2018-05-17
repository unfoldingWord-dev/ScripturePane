import Container from './src/Container';
import {connectTool} from 'tc-tool';
import path from 'path';

export default connectTool('ScripturePane', {
  localeDir: path.join(__dirname, 'src/locale')
})(Container);
