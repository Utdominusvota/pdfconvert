import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import MergePDF from '../pages/MergePDF';
import SplitPDF from '../pages/SplitPDF';
import CompressPDF from '../pages/CompressPDF';
import ConvertPDF from '../pages/ConvertPDF';
import WatermarkPDF from '../pages/WatermarkPDF';
import RotatePDF from '../pages/RotatePDF';
import SignPDF from '../pages/SignPDF';
import ProtectPDF from '../pages/ProtectPDF';
import UnlockPDF from '../pages/UnlockPDF';
import NotFound from '../pages/NotFound';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/merge-pdf" component={MergePDF} />
        <Route path="/split-pdf" component={SplitPDF} />
        <Route path="/compress-pdf" component={CompressPDF} />
        <Route path="/convert-pdf" component={ConvertPDF} />
        <Route path="/watermark-pdf" component={WatermarkPDF} />
        <Route path="/rotate-pdf" component={RotatePDF} />
        <Route path="/sign-pdf" component={SignPDF} />
        <Route path="/protect-pdf" component={ProtectPDF} />
        <Route path="/unlock-pdf" component={UnlockPDF} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;