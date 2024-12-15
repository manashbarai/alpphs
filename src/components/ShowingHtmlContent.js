import React from 'react';

const ShowingHtmlContent = ({ htmlContent, title }) => {
  return (
    <>
      {/* Simulating the full HTML structure */}
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </head>
      <body>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{ margin: '', fontFamily: 'Arial, sans-serif' }}
        />
      </body>
    </>
  );
};

export default ShowingHtmlContent;
