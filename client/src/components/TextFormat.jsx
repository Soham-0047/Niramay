import React from 'react'

const TextFormat = (inputString) => {
  // Autobold: Wrap important words in [object Object]
  const boldRegex = /\b(important|notable|key)\b/gi;
  const boldFormattedString = inputString.replace(boldRegex, '[object Object]');
  
  // Underline: Wrap emphasized text in [object Object]
  const underlineRegex = /\b(significant|crucial|pivotal)\b/gi;
  const underlineFormattedString = boldFormattedString.replace(
  underlineRegex,
  '[object Object]'
  );
  
  // Links: Add hyperlinks to URLs
  const linkRegex = /((https?:\/\/|www\.)\S+)/g;
  const linkFormattedString = underlineFormattedString.replace(
  linkRegex,
  '<a href="$1">$1</a>'
  );
  
  // Line Breaks: Add <br/> tags for new lines
//   const lineBreakRegex = /\n/g;
//   const lineBreakFormattedString = linkFormattedString.replace(
//   lineBreakRegex,
//   '<br/>'
//   );

const boldRegex1 = /\*\*(.*?)\*\*/g;
const boldFormattedString1= linkFormattedString.replace(boldRegex1, '<strong>$1</strong>');


  const withLineBreaks = boldFormattedString1.split('\n').map((paragraph, index) => (
    <React.Fragment key={index}>
      {index > 0 && <br />} {/* Add line break after the first paragraph */}
      {paragraph}
    </React.Fragment>
  ));





  // const lineBreakFormattedString = linkFormattedString.replace(
  //   lineBreakRegex,
  //   /<br\s*\/?>/gi,
  //   '\n'
  // );
//   return withLineBreaks;

    return <React.Fragment>{withLineBreaks}</React.Fragment>;;
}





export default TextFormat



// const formatText = (rawText) => {
//     const boldText = rawText.replace(/\*\*(.*?)\*\*/g, (match, p1) => (
//       <strong key={match}>{p1}</strong>
//     ));
  
//     // Replace double underscores with underline
//     const underlinedText = boldText.replace(/__(.*?)__/g, (match, p1) => (
//       <u key={match}>{p1}</u>
//     ));
  
//     // Replace double square brackets with links
//     const linkedText = underlinedText.replace(/\[\[(.*?)\]\]/g, (match, p1) => (
//       <a key={match} href={p1} target="_blank" rel="noopener noreferrer">
//         {p1}
//       </a>
//     ));
  
//     // Handle case where content inside double asterisks is an object
//     const objectText = linkedText.replace(/\*\*(\{.*?\})\*\*/g, (match, p1) => {
//       try {
//         const parsedObject = JSON.parse(p1);
//         if (typeof parsedObject === 'object') {
//           return <pre key={match}>{JSON.stringify(parsedObject, null, 2)}</pre>;
//         }
//       } catch (error) {
//         console.error('Error parsing object:', error);
//       }
//       return match; // Return the original text if parsing fails
//     });
  
//     // Add line breaks for double line breaks in the text
//     const withLineBreaks = objectText.split('\n').map((paragraph, index) => (
//       <React.Fragment key={index}>
//         {index > 0 && <br />} {/* Add line break after the first paragraph */}
//         {paragraph}
//       </React.Fragment>
//     ));
  
//     return withLineBreaks;
  
//   };