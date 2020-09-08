import React from 'react';
import { connect } from 'react-redux';
import { delExperience } from '../../redux/actions/profile';
import { PropTypes } from 'prop-types';
//styles
import MUIDataTable from "mui-datatables";

const Experience = ({ experience, delExperience }) => {

    const columns = [{
        name: "title",
        label: "Title",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "company",
        label: "Company",
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
    const handleRowDelete = rowId => delExperience(rowId)

    experience.forEach(exp => {
        let fromDate = (new Date(exp.from)).toDateString();
        let toDate = exp.current ? 'present' : (new Date(exp.to)).toDateString();

        rowDataIds.push(exp._id)

        let row = {
            title: exp.title, company: exp.company, from: fromDate, to: toDate
        }
        data.push(row)
    })

    const options = {
        onRowsDelete: (rowsDeleted) => {
            const idToDelete = rowsDeleted.data.map(d => rowDataIds[d.dataIndex]).join("")        //array of id to be deleted
            handleRowDelete(idToDelete)
            return false                    //to avoid deleting data before confirmation in dialog box
        },
        selectableRows: 'single'
    }

    const experienceTable = <MUIDataTable
        title="Working Experience"
        columns={columns}
        data={data}
        options={options}
    />

    return (<section className="section-experiences">
        {experienceTable}
    </section>)
}

Experience.propTypes = {
    delExperience: PropTypes.func.isRequired,
    experience: PropTypes.array.isRequired
}

export default connect(null, { delExperience })(Experience);