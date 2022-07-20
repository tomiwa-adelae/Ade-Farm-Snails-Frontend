import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
   return (
      <Helmet>
         <title>{title}</title>
         <meta name="description" content={description} />
         <meta name="keyword" content={keywords} />
      </Helmet>
   );
};

Meta.defaultProps = {
   title: 'Ade Farm Snails',
   description:
      'We sell the best snail meat in the country. World wide snail delivery organisation',
   keywords:
      'snails, ade farm snails, farms, ade farms, snail, order, order snails',
};

export default Meta;
