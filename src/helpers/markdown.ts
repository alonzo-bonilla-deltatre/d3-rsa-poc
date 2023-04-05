import {remark} from 'remark';
import remarkHtml from 'remark-html';

type MarkdownObject = {
    text: string,
    links: string[]
    strikeouts: string[]
    superScripts: string[]
    subScripts: string[]
}

export const Transform = async (text: string): Promise<string> => {
    if (!text) {
        return "";
    }
    return await Encode(text);
}

async function Encode(text: string): Promise<string> {
    if (!text) {
        return "";
    }
    let markdownObject: MarkdownObject = {
        text: text,
        links: [],
        strikeouts: [],
        superScripts: [],
        subScripts: []
    };

    // remark and remark-html not manage in the proper way some html tags for this we need to put some placeholder and replace them after the remake process 
    markdownObject = ReplaceAnchorTagsWithPlaceholder(markdownObject);
    markdownObject = ReplaceStrikeoutTagsWithPlaceholder(markdownObject);
    markdownObject = ReplaceSuperScriptTagsWithPlaceholder(markdownObject);
    markdownObject = ReplaceSubScriptTagsWithPlaceholder(markdownObject);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(remarkHtml, {sanitize: true})
        .process(markdownObject.text);
    markdownObject.text = processedContent.toString();

    // replaced placeholder with correct html tags 
    markdownObject = ReplacePlaceholderWithAnchorTags(markdownObject);
    markdownObject = ReplacePlaceholderWithStrikeoutTags(markdownObject);
    markdownObject = ReplacePlaceholderWithSuperScriptTags(markdownObject);
    markdownObject = ReplacePlaceholderWithSubScriptTags(markdownObject);
    
    return markdownObject.text;
}

function ReplaceAnchorTagsWithPlaceholder(markdownObject: MarkdownObject) {
    // manage links
    const patternRegex = /<\s*(a)[^>]*>(.*?)<\s*\/\s*(a)>/g;
    const matches = Array.from(markdownObject.text.matchAll(patternRegex)).map(m => m[0]);

    matches?.map(m => {
        markdownObject.links.push(m);
        markdownObject.text = markdownObject.text.replace(m, `[link-placeholder-${markdownObject.links.length - 1}]`);
    });

    return markdownObject;
}

function ReplaceStrikeoutTagsWithPlaceholder(markdownObject: MarkdownObject) {
    // manage strikeout
    const patternRegex = /<\s*(s)[^>]*>(.*?)<\s*\/\s*(s)>/g;
    const matches = Array.from(markdownObject.text.matchAll(patternRegex)).map(m => m[0]);

    matches?.map(m => {
        markdownObject.strikeouts.push(m);
        markdownObject.text = markdownObject.text.replace(m, `[strikeout-placeholder-${markdownObject.links.length - 1}]`);
    });
    
    return markdownObject;
}

function ReplaceSuperScriptTagsWithPlaceholder(markdownObject: MarkdownObject) {
    // manage superscript
    const patternRegex = /<\s*(sup)[^>]*>(.*?)<\s*\/\s*(sup)>/g;
    const matches = Array.from(markdownObject.text.matchAll(patternRegex)).map(m => m[0]);

    matches?.map(m => {
        markdownObject.superScripts.push(m);
        markdownObject.text = markdownObject.text.replace(m, `[superscript-placeholder-${markdownObject.links.length - 1}]`);
    });
    return markdownObject;
}

function ReplaceSubScriptTagsWithPlaceholder(markdownObject: MarkdownObject) {
    // manage subscript
    const patternRegex = /<\s*(sub)[^>]*>(.*?)<\s*\/\s*(sub)>/g;
    const matches = Array.from(markdownObject.text.matchAll(patternRegex)).map(m => m[0]);

    matches?.map(m => {
        markdownObject.subScripts.push(m);
        markdownObject.text = markdownObject.text.replace(m, `[subscript-placeholder-${markdownObject.links.length - 1}]`);
    });

    return markdownObject;
}

function ReplacePlaceholderWithAnchorTags(markdownObject: MarkdownObject) {
    // manage links
    for (let i = 0; i < markdownObject.links.length; i++)
    {
        let link = markdownObject.links[i];
        markdownObject.text = markdownObject.text.replace(`[link-placeholder-${i}]`, link);
    }

    return markdownObject;
}

function ReplacePlaceholderWithStrikeoutTags(markdownObject: MarkdownObject) {
    // manage strikeouts
    for (let i = 0; i < markdownObject.strikeouts.length; i++)
    {
        let link = markdownObject.strikeouts[i];
        markdownObject.text = markdownObject.text.replace(`[strikeout-placeholder-${i}]`, link);
    }

    return markdownObject;
}

function ReplacePlaceholderWithSuperScriptTags(markdownObject: MarkdownObject) {
    // manage superscripts
    for (let i = 0; i < markdownObject.superScripts.length; i++)
    {
        let link = markdownObject.superScripts[i];
        markdownObject.text = markdownObject.text.replace(`[superscript-placeholder-${i}]`, link);
    }

    return markdownObject;
}

function ReplacePlaceholderWithSubScriptTags(markdownObject: MarkdownObject) {
    // manage subscripts
    for (let i = 0; i < markdownObject.subScripts.length; i++)
    {
        let link = markdownObject.subScripts[i];
        markdownObject.text = markdownObject.text.replace(`[subscript-placeholder-${i}]`, link);
    }

    return markdownObject;
}