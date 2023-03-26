import React from 'react';
import AddRowDialog from './AddRowDialog';

import CashbookEntries from './CashbookEntries';

const CashbookScreen = ({route}: any) => {
  const {id} = route.params;

  return (
    <>
      <CashbookEntries id={id} />
      <AddRowDialog id={id} />
    </>
  );
};

export default CashbookScreen;
