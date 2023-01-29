import React, { Component, PropTypes } from 'react';
import Pagination from 'material-ui-pagination';

class PaginationUser extends Component {
    constructor(props) {
        super(props);
        const { totalRecords, pageSize } = this.props;
        this.state = {
            total: Math.floor((totalRecords + pageSize - 1) / pageSize),
            display: pageSize,
            pageNo: 1,
            totalRecords,
        };
        this.changePage = this.changePage.bind(this);
        this.updateTotal = this.updateTotal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { totalRecords, currentPageNumber } = nextProps;
        const { pageNo } = this.state;
        this.updateTotal(totalRecords);
        if (currentPageNumber !== pageNo) {
            this.setState({ pageNo: currentPageNumber });
        }
    }

    updateTotal(totalRecords) {
        const { display } = this.state;
        const total = Math.floor((totalRecords + (display - 1)) / display);
        this.setState({ total, totalRecords });
    }

    changePage(pageNo) {
        this.setState({ pageNo }, () => {
            const { display } = this.state;
            this.props.paginate(pageNo, display);
        });
    }

    render() {
        const { total, pageNo, display, totalRecords } = this.state;
        const paginationContent = total ? (
          <Pagination
            total={total}
            current={pageNo}
            display={display}
            onChange={this.changePage}
          />
        ) : null;
        return (
          <div
            style={{
                maxWidth: 600,
                margin: '0 auto',
                paddingTop: '2%',
                textAlign: 'center',
            }}
          >
            {
              (totalRecords > display) ?
                paginationContent
              : null
            }
          </div>
        );
    }
}

PaginationUser.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    currentPageNumber: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
};

PaginationUser.defaultProps = {
    pageSize: 10,
};

export default (PaginationUser);
