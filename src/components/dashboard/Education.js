import React from 'react';
import { connect } from 'react-redux';
import { delEducation } from '../../redux/actions/profile';
import { PropTypes } from 'prop-types';
import MUIDataTable from "mui-datatables";

const Education = ({ education, delEducation }) => {

    const columns = [{
        name: "school",
        label: "School",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "degree",
        label: "Degree",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "from",
        label: "From",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "to",
        label: "To",
        options: {
            filter: true,
            sort: true,
        }
    }]
    const data = [];
    const rowDataIds = [];

    const handleRowDelete = rowId => delEducation(rowId)

    education.forEach(edu => {
        let fromDate = (new Date(edu.from)).toDateString();
        let toDate = edu.current ? 'present' : (new Date(edu.to)).toDateString();

        rowDataIds.push(edu._id)

        let row = {
            school: edu.school, degree: edu.degree, from: fromDate, to: toDate
        }
        data.push(row)
    })

    const options = {
        onRowsDelete: (rowsDeleted) => {
            const idToDelete = rowsDeleted.data.map(d => rowDataIds[d.dataIndex]).join("")        //id to be deleted
            handleRowDelete(idToDelete)
            return false                    //to avoid deleting data before confirmation in dialog box
        },
        selectableRows: 'single',
        rowsPerPageOptions: [],
        filter: false
    }

    const educationTable = <MUIDataTable
        title="Academic Qualification"
        columns={columns}
        data={data}
        options={options}
    />

    return (<section className="section-educations">
        {educationTable}
    </section>)
}


Education.propTypes = {
    delEducation: PropTypes.func.isRequired
}



export default connect(null, { delEducation })(Education);