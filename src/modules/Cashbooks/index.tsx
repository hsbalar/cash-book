import React from 'react';
import AddCashbookDialog from './AddCashbookDialog';

import CashbookList from './CashbookList';

const CashbooksScreen = () => {
  return (
    <>
      <CashbookList />
      <AddCashbookDialog />
    </>
  );
};

export default CashbooksScreen;
