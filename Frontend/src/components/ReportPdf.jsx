import React, { useState } from 'react';
import Pdf from './Pdf';

const ReportPdf = ({ data, handleData }) => {
    // const [showPDF, setShowPDF] = useState(false);

    return (
        <div className='flex justify-center flex-col'>
            {data.length > 0 && <Pdf data={data} handleData={handleData} />}
        </div>
    );
};

export default ReportPdf;
