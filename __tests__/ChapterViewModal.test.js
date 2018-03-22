/* eslint-env jest */
import ChapterViewModal from '../src/components/ChapterViewModal';

// Tests for ChapterViewModal React Component
describe('Dialog title', () => {
  it('only has a project name', () => {
    const manifest = {
      project: {
        name: 'project name'
      }
    };
    const title = ChapterViewModal.makeTitle(manifest);
    expect(title).toEqual('project name');
  });

  it('only has a book name', () => {
    const manifest = {
      target_language: {
        book: {
          name: 'book name'
        }
      }
    };
    const title = ChapterViewModal.makeTitle(manifest);
    expect(title).toEqual('book name');
  });

  it('has a book name and project name', () => {
    const manifest = {
      project: {
        name: 'project name'
      },
      target_language: {
        book: {
          name: 'book name'
        }
      }
    };
    const title = ChapterViewModal.makeTitle(manifest);
    expect(title).toEqual('book name');
  });
});
