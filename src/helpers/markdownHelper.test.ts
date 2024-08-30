import {
  replaceAnchorTagsWithPlaceholder,
  replaceStrikeoutTagsWithPlaceholder,
  replaceSuperScriptTagsWithPlaceholder,
  replaceSubScriptTagsWithPlaceholder,
  replacePlaceholderWithAnchorTags,
  replacePlaceholderWithStrikeoutTags,
  replacePlaceholderWithSuperScriptTags,
  replacePlaceholderWithSubScriptTags,
} from '@/helpers/markdownHelper';

describe('markdownHelper', () => {
  it('should replace anchor tags with placeholders', () => {
    // ARRANGE
    const markdownObject = {
      text: '<a href="http://example.com">link</a>',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    // ACT
    const result = replaceAnchorTagsWithPlaceholder(markdownObject);
    // ASSERT
    expect(result.text).toBe('[link-placeholder-0]');
    expect(result.links).toEqual(['<a href="http://example.com">link</a>']);
  });

  it('should replace strikeout tags with placeholders', () => {
    // ARRANGE
    const markdownObject = { text: '<s>strikeout</s>', links: [], strikeouts: [], superScripts: [], subScripts: [] };
    // ACT
    const result = replaceStrikeoutTagsWithPlaceholder(markdownObject);
    // ASSERT
    expect(result.text).toBe('[strikeout-placeholder-0]');
    expect(result.strikeouts).toEqual(['<s>strikeout</s>']);
  });

  it('should replace superscript tags with placeholders', () => {
    // ARRANGE
    const markdownObject = {
      text: '<sup>superscript</sup>',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    // ACT
    const result = replaceSuperScriptTagsWithPlaceholder(markdownObject);
    // ASSERT
    expect(result.text).toBe('[superscript-placeholder-0]');
    expect(result.superScripts).toEqual(['<sup>superscript</sup>']);
  });

  it('should replace subscript tags with placeholders', () => {
    // ARRANGE
    const markdownObject = {
      text: '<sub>subscript</sub>',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    // ACT
    const result = replaceSubScriptTagsWithPlaceholder(markdownObject);
    // ASSERT
    expect(result.text).toBe('[subscript-placeholder-0]');
    expect(result.subScripts).toEqual(['<sub>subscript</sub>']);
  });

  it('should replace placeholders with anchor tags', () => {
    // ARRANGE
    const markdownObject = {
      text: '[link-placeholder-0]',
      links: ['<a href="http://example.com">link</a>'],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    // ACT
    const result = replacePlaceholderWithAnchorTags(markdownObject);
    // ASSERT
    expect(result.text).toBe('<a href="http://example.com">link</a>');
  });

  it('should replace placeholders with strikeout tags', () => {
    // ARRANGE
    const markdownObject = {
      text: '[strikeout-placeholder-0]',
      links: [],
      strikeouts: ['<s>strikeout</s>'],
      superScripts: [],
      subScripts: [],
    };
    // ACT
    const result = replacePlaceholderWithStrikeoutTags(markdownObject);
    // ASSERT
    expect(result.text).toBe('<s>strikeout</s>');
  });

  it('should replace placeholders with superscript tags', () => {
    // ARRANGE
    const markdownObject = {
      text: '[superscript-placeholder-0]',
      links: [],
      strikeouts: [],
      superScripts: ['<sup>superscript</sup>'],
      subScripts: [],
    };
    // ACT
    const result = replacePlaceholderWithSuperScriptTags(markdownObject);
    // ASSERT
    expect(result.text).toBe('<sup>superscript</sup>');
  });

  it('should replace placeholders with subscript tags', () => {
    // ARRANGE
    const markdownObject = {
      text: '[subscript-placeholder-0]',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: ['<sub>subscript</sub>'],
    };
    // ACT
    const result = replacePlaceholderWithSubScriptTags(markdownObject);
    // ASSERT
    expect(result.text).toBe('<sub>subscript</sub>');
  });

  it('should handle text without anchor tags', () => {
    // ARRANGE
    const markdownObject = { text: 'No links here', links: [], strikeouts: [], superScripts: [], subScripts: [] };
    // ACT
    const result = replaceAnchorTagsWithPlaceholder(markdownObject);
    // ASSERT
    expect(result.text).toBe('No links here');
    expect(result.links).toEqual([]);
  });

  it('should handle text without strikeout tags', () => {
    // ARRANGE
    const markdownObject = { text: 'No strikeouts here', links: [], strikeouts: [], superScripts: [], subScripts: [] };
    // ACT
    const result = replaceStrikeoutTagsWithPlaceholder(markdownObject);
    // ASSERT
    expect(result.text).toBe('No strikeouts here');
    expect(result.strikeouts).toEqual([]);
  });

  it('should handle text without superscript tags', () => {
    // ARRANGE
    const markdownObject = {
      text: 'No superscripts here',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    // ACT
    const result = replaceSuperScriptTagsWithPlaceholder(markdownObject);
    // ASSERT
    expect(result.text).toBe('No superscripts here');
    expect(result.superScripts).toEqual([]);
  });

  it('should handle text without subscript tags', () => {
    // ARRANGE
    const markdownObject = { text: 'No subscripts here', links: [], strikeouts: [], superScripts: [], subScripts: [] };
    // ACT
    const result = replaceSubScriptTagsWithPlaceholder(markdownObject);
    // ASSERT
    expect(result.text).toBe('No subscripts here');
    expect(result.subScripts).toEqual([]);
  });

  it('should handle text without placeholders for anchor tags', () => {
    // ARRANGE
    const markdownObject = {
      text: 'No placeholders here',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    // ACT
    const result = replacePlaceholderWithAnchorTags(markdownObject);
    // ASSERT
    expect(result.text).toBe('No placeholders here');
  });

  it('should handle text without placeholders for strikeout tags', () => {
    // ARRANGE
    const markdownObject = {
      text: 'No placeholders here',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    // ACT
    const result = replacePlaceholderWithStrikeoutTags(markdownObject);
    // ASSERT
    expect(result.text).toBe('No placeholders here');
  });

  it('should handle text without placeholders for superscript tags', () => {
    // ARRANGE
    const markdownObject = {
      text: 'No placeholders here',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    // ACT
    const result = replacePlaceholderWithSuperScriptTags(markdownObject);
    // ASSERT
    expect(result.text).toBe('No placeholders here');
  });

  it('should handle text without placeholders for subscript tags', () => {
    // ARRANGE
    const markdownObject = {
      text: 'No placeholders here',
      links: [],
      strikeouts: [],
      superScripts: [],
      subScripts: [],
    };
    // ACT
    const result = replacePlaceholderWithSubScriptTags(markdownObject);
    // ASSERT
    expect(result.text).toBe('No placeholders here');
  });
});
