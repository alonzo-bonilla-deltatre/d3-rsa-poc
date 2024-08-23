import {
  replaceAnchorTagsWithPlaceholder,
  replaceStrikeoutTagsWithPlaceholder,
  replaceSuperScriptTagsWithPlaceholder,
  replaceSubScriptTagsWithPlaceholder,
  replacePlaceholderWithAnchorTags,
  replacePlaceholderWithStrikeoutTags,
  replacePlaceholderWithSuperScriptTags,
  replacePlaceholderWithSubScriptTags,
} from './markdownHelper';

describe('markdownHelper', () => {
  it('should replace anchor tags with placeholders', () => {
    const markdownObject = {
      text: '<a href="http://example.com">link</a>',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    const result = replaceAnchorTagsWithPlaceholder(markdownObject);
    expect(result.text).toBe('[link-placeholder-0]');
    expect(result.links).toEqual(['<a href="http://example.com">link</a>']);
  });

  it('should replace strikeout tags with placeholders', () => {
    const markdownObject = { text: '<s>strikeout</s>', links: [], strikeouts: [], superScripts: [], subScripts: [] };
    const result = replaceStrikeoutTagsWithPlaceholder(markdownObject);
    expect(result.text).toBe('[strikeout-placeholder-0]');
    expect(result.strikeouts).toEqual(['<s>strikeout</s>']);
  });

  it('should replace superscript tags with placeholders', () => {
    const markdownObject = {
      text: '<sup>superscript</sup>',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    const result = replaceSuperScriptTagsWithPlaceholder(markdownObject);
    expect(result.text).toBe('[superscript-placeholder-0]');
    expect(result.superScripts).toEqual(['<sup>superscript</sup>']);
  });

  it('should replace subscript tags with placeholders', () => {
    const markdownObject = {
      text: '<sub>subscript</sub>',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    const result = replaceSubScriptTagsWithPlaceholder(markdownObject);
    expect(result.text).toBe('[subscript-placeholder-0]');
    expect(result.subScripts).toEqual(['<sub>subscript</sub>']);
  });

  it('should replace placeholders with anchor tags', () => {
    const markdownObject = {
      text: '[link-placeholder-0]',
      links: ['<a href="http://example.com">link</a>'],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    const result = replacePlaceholderWithAnchorTags(markdownObject);
    expect(result.text).toBe('<a href="http://example.com">link</a>');
  });

  it('should replace placeholders with strikeout tags', () => {
    const markdownObject = {
      text: '[strikeout-placeholder-0]',
      links: [],
      strikeouts: ['<s>strikeout</s>'],
      superScripts: [],
      subScripts: [],
    };
    const result = replacePlaceholderWithStrikeoutTags(markdownObject);
    expect(result.text).toBe('<s>strikeout</s>');
  });

  it('should replace placeholders with superscript tags', () => {
    const markdownObject = {
      text: '[superscript-placeholder-0]',
      links: [],
      strikeouts: [],
      superScripts: ['<sup>superscript</sup>'],
      subScripts: [],
    };
    const result = replacePlaceholderWithSuperScriptTags(markdownObject);
    expect(result.text).toBe('<sup>superscript</sup>');
  });

  it('should replace placeholders with subscript tags', () => {
    const markdownObject = {
      text: '[subscript-placeholder-0]',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: ['<sub>subscript</sub>'],
    };
    const result = replacePlaceholderWithSubScriptTags(markdownObject);
    expect(result.text).toBe('<sub>subscript</sub>');
  });

  it('should handle text without anchor tags', () => {
    const markdownObject = { text: 'No links here', links: [], strikeouts: [], superScripts: [], subScripts: [] };
    const result = replaceAnchorTagsWithPlaceholder(markdownObject);
    expect(result.text).toBe('No links here');
    expect(result.links).toEqual([]);
  });

  it('should handle text without strikeout tags', () => {
    const markdownObject = { text: 'No strikeouts here', links: [], strikeouts: [], superScripts: [], subScripts: [] };
    const result = replaceStrikeoutTagsWithPlaceholder(markdownObject);
    expect(result.text).toBe('No strikeouts here');
    expect(result.strikeouts).toEqual([]);
  });

  it('should handle text without superscript tags', () => {
    const markdownObject = {
      text: 'No superscripts here',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    const result = replaceSuperScriptTagsWithPlaceholder(markdownObject);
    expect(result.text).toBe('No superscripts here');
    expect(result.superScripts).toEqual([]);
  });

  it('should handle text without subscript tags', () => {
    const markdownObject = { text: 'No subscripts here', links: [], strikeouts: [], superScripts: [], subScripts: [] };
    const result = replaceSubScriptTagsWithPlaceholder(markdownObject);
    expect(result.text).toBe('No subscripts here');
    expect(result.subScripts).toEqual([]);
  });

  it('should handle text without placeholders for anchor tags', () => {
    const markdownObject = {
      text: 'No placeholders here',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    const result = replacePlaceholderWithAnchorTags(markdownObject);
    expect(result.text).toBe('No placeholders here');
  });

  it('should handle text without placeholders for strikeout tags', () => {
    const markdownObject = {
      text: 'No placeholders here',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    const result = replacePlaceholderWithStrikeoutTags(markdownObject);
    expect(result.text).toBe('No placeholders here');
  });

  it('should handle text without placeholders for superscript tags', () => {
    const markdownObject = {
      text: 'No placeholders here',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    const result = replacePlaceholderWithSuperScriptTags(markdownObject);
    expect(result.text).toBe('No placeholders here');
  });

  it('should handle text without placeholders for subscript tags', () => {
    const markdownObject = {
      text: 'No placeholders here',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    const result = replacePlaceholderWithSubScriptTags(markdownObject);
    expect(result.text).toBe('No placeholders here');
  });
});
