import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import {
  AddDialog, DeleteDialog, EditDialog, Table,
} from './components';
import TraineeListField from './TraineeListField';
import { getDateFormatted } from '../../lib';
import { SharedSnackBarContextConsumer } from '../../contexts';

class TraineeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenAddDialog: false,
      isOpenEditDialog: false,
      isOpenDeleteDialog: false,
      deleteRow: {},
      editRow: {},
      dialog: {},
      orderBy: '',
      order: '',
      count: 100,
      page: 0,
      rowsPerPage: 10,
    };
  }

  handleButtonClick = () => {
    this.setState({ isOpenAddDialog: true });
  };

  handleDialogClose = () => {
    this.setState({ isOpenAddDialog: false });
  };

  handleDialogSubmit = (data) => {
    const { openSnackBar } = this.context;
    const { dialog } = this.state;

    this.setState({ dialog: data }, () => {
      console.log(dialog);
    });

    openSnackBar('Trainee is added successfully', 'success');
  };

  handleSelect = () => {
    // console.log(event);
    // console.log(row);
  }

  handleSort = (column, order) => {
    this.setState({ orderBy: column, order });
  }

  handlePageChange = (event, page) => {
    this.setState({ page });
  }

  handleEditDialogOpen = (event, row) => {
    this.setState({ isOpenEditDialog: true, editRow: row });
  }

  handleEditDialogClose = () => {
    this.setState({ isOpenEditDialog: false });
  }

  handleEditDialogSubmit = (data, row) => {
    const { openSnackBar } = this.context;
    console.log('Data Modified');
    if (new Date(row.createdAt) < new Date('2019-02-14')) {
      openSnackBar('This is an error message', 'error');
    } else {
      openSnackBar('This is a success message', 'success');
    }
  }

  handleRemoveDialogOpen = (event, row) => {
    this.setState({ isOpenDeleteDialog: true, deleteRow: row });
  }

  handleRemoveDialogClose = () => {
    this.setState({ isOpenDeleteDialog: false });
  }

  handleRemoveDialogSubmit = (row) => {
    const { openSnackBar } = this.context;
    console.log('Data Removed');
    if (new Date(row.createdAt) <= new Date('2019-02-14')) {
      openSnackBar('This is an error message', 'error');
    } else {
      openSnackBar('This is a success message', 'success');
    }
  }

  render() {
    const {
      isOpenAddDialog, isOpenEditDialog, isOpenDeleteDialog,
      orderBy, order, count, page, rowsPerPage, deleteRow, editRow,
    } = this.state;
    const { traineeList } = this.props;
    const {
      handleSelect, handleSort, handlePageChange,
      handleEditDialogOpen, handleEditDialogClose, handleEditDialogSubmit,
      handleButtonClick, handleDialogSubmit, handleDialogClose,
      handleRemoveDialogOpen, handleRemoveDialogClose, handleRemoveDialogSubmit,
    } = this;
    const columns = [
      {
        field: 'name',
        align: 'center',
        label: 'Name',
      }, {
        field: 'email',
        label: 'E-mail',
        format: (value) => value && value.toUpperCase(),
      }, {
        field: 'createdAt',
        label: 'Date',
        align: 'right',
        format: getDateFormatted,
      },
    ];

    const actions = [
      {
        icon: <Edit />,
        key: 'Edit',
        handler: handleEditDialogOpen,
      },
      {
        icon: <Delete />,
        key: 'Delete',
        handler: handleRemoveDialogOpen,
      },
    ];

    return (
      <>
        <Grid container justify="flex-end">
          <Button variant="outlined" color="primary" onClick={handleButtonClick}>
            ADD TRAINEELIST
          </Button>
        </Grid>
        <Table
          id="trainee"
          columns={columns}
          data={traineeList}
          orderBy={orderBy}
          order={order}
          actions={actions}
          onSelect={handleSelect}
          onSort={handleSort}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handlePageChange}
        />
        <AddDialog
          open={isOpenAddDialog}
          onClose={handleDialogClose}
          onSubmit={handleDialogSubmit}
        />
        <DeleteDialog
          open={isOpenDeleteDialog}
          row={deleteRow}
          onClose={handleRemoveDialogClose}
          onSubmit={handleRemoveDialogSubmit}
        />
        <EditDialog
          open={isOpenEditDialog}
          row={editRow}
          onClose={handleEditDialogClose}
          onSubmit={handleEditDialogSubmit}
        />
        <TraineeListField traineeList={traineeList} />
      </>
    );
  }
}

TraineeList.propTypes = {
  traineeList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TraineeList.contextType = SharedSnackBarContextConsumer;

export default TraineeList;
