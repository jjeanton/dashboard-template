import React, { useState, useEffect, useRef, Fragment } from 'react';
import propsTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import {Button} from 'rsuite';

const CsvExport = ({ asyncExportMethod, children, disable }) => {
  const [csvData, setCsvData] = useState(false);
  const [loading, setLoading] = useState(false);
  const csvInstance = useRef();
  useEffect(() => {
    if (csvData && csvInstance.current && csvInstance.current.link) {
      setTimeout(() => {
        csvInstance.current.link.click();
        setCsvData(false);
        setLoading(false);
      });
    }
  }, [csvData]);
  return (
    <Fragment>
      <Button
      appearance="primary"
      className="btn btn-primary ml-2"
        onClick={async () => {
          if (disable) {
            return;
          }
          setLoading(true);
          const newCsvData = await asyncExportMethod();
          setCsvData(newCsvData);
        }}
        loading={loading}
      >
        <i className="icon-cloud-download"></i>
      </Button>
      {csvData ?
        <CSVLink
          data={csvData.data}
          // headers={csvData.headers}
          filename={csvData.filename}
          ref={csvInstance}
        />
      : undefined}
    </Fragment>

  );
};

export default CsvExport;

CsvExport.defaultProps = {
  children: undefined,
  asyncExportMethod: () => null,
  disable: false,
};

CsvExport.propTypes = {
  children: propsTypes.node,
  asyncExportMethod: propsTypes.func,
  disable: propsTypes.bool,
};