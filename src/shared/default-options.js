// these are the default options
const defaultOptions = {
  outputFormat: "markdown",

  headingStyle: "atx",
  hr: "___",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  fence: "```",
  preserveCodeFormatting: false,
  emDelimiter: "_",
  strongDelimiter: "**",
  linkStyle: "inlined",
  linkReferenceStyle: "full",
  imageStyle: "markdown",
  imageRefStyle: "inlined",
  tableFormatting: {
    stripLinks: true,
    stripFormatting: false,
    prettyPrint: true,
    centerText: true
  },
  frontmatter: "---\ncreated: {date:YYYY-MM-DDTHH:mm:ss} (UTC {date:Z})\ntags: [{keywords}]\nsource: {baseURI}\nauthor: {byline}\n---\n\n# {pageTitle}\n\n> ## Excerpt\n> {excerpt}\n\n---",
  backmatter: "",
  title: "{pageTitle}",
  includeTemplate: false,
  saveAs: false,
  downloadImages: false,
  imagePrefix: '{pageTitle}/',
  mdClipsFolder: null,
  disallowedChars: '[]#^',
  downloadMode: 'downloadsApi',
  turndownEscape: true,
  contextMenus: true,
  obsidianIntegration: false,
  obsidianVault: "",
  obsidianFolder: "",

  orgBulletListMarker: "-",
  orgTodoKeyword: "",
  orgIncludeProperties: false,
  orgExportSettings: "",
  orgPreambleTemplate: "#+TITLE: {pageTitle}\n#+AUTHOR: {byline}\n#+DATE: {date:YYYY-MM-DD}\n#+FILETAGS: {keywords}\n#+SOURCE: {baseURI}",
  orgImageStyle: "org",
}

/**
 * Returns options applicable to each output format.
 * 
 * Markdown options:
 *   headingStyle, hr, bulletListMarker, codeBlockStyle, fence,
 *   preserveCodeFormatting, emDelimiter, strongDelimiter, linkStyle,
 *   linkReferenceStyle, imageStyle, imageRefStyle, tableFormatting,
 *   frontmatter, backmatter, title, turndownEscape
 * 
 * Org mode options (used when outputFormat is "org"):
 *   orgBulletListMarker, orgTodoKeyword, orgIncludeProperties,
 *   orgExportSettings, orgPreambleTemplate, orgImageStyle
 * 
 * Shared options (apply to both formats):
 *   includeTemplate, saveAs, downloadImages, imagePrefix,
 *   mdClipsFolder, disallowedChars, downloadMode, contextMenus,
 *   obsidianIntegration, obsidianVault, obsidianFolder
 */
function getFormatSpecificOptions(format) {
  const markdownOptions = [
    'headingStyle', 'hr', 'bulletListMarker', 'codeBlockStyle', 'fence',
    'preserveCodeFormatting', 'emDelimiter', 'strongDelimiter', 'linkStyle',
    'linkReferenceStyle', 'imageStyle', 'imageRefStyle', 'tableFormatting',
    'frontmatter', 'backmatter', 'title', 'turndownEscape'
  ];
  
  const orgOptions = [
    'orgBulletListMarker', 'orgTodoKeyword', 'orgIncludeProperties',
    'orgExportSettings', 'orgPreambleTemplate', 'orgImageStyle'
  ];
  
  const sharedOptions = [
    'includeTemplate', 'saveAs', 'downloadImages', 'imagePrefix',
    'mdClipsFolder', 'disallowedChars', 'downloadMode', 'contextMenus',
    'obsidianIntegration', 'obsidianVault', 'obsidianFolder'
  ];
  
  if (format === 'org') {
    return [...orgOptions, ...sharedOptions];
  }
  return [...markdownOptions, ...sharedOptions];
}

// function to get the options from storage and substitute default options if it fails
async function getOptions() {
  let options = defaultOptions;
  try {
    options = await browser.storage.sync.get(defaultOptions);
  } catch (err) {
    console.error(err);
  }
  if (!browser.downloads) options.downloadMode = 'contentLink';
  return options;
}