import React, { Component } from "react";
import Layout from "../../core/Layout";
import { removeFlight, getAllAvailableFlightes } from "../../../Utils/Requests/Flight";
import ReactDatatable from "@ashvin27/react-datatable";
import moment from "moment";
import Swal from "sweetalert2";
import { SERVER_ROUTE } from "../../../Utils/config";
import Loading from "../../core/Loading";

class FlightAvailable extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        key: "sn",
        text: "S.N",
        className: "id",
        align: "left",
        sortable: true
      },
      {
        key: "image",
        text: "Image",
        className: "image",
        width: 100,
        align: "left",
        sortable: false,
        cell: record => {
          console.log(record);
          return (
            <>
              <img
                className="flightImage"
                src={`${SERVER_ROUTE}/uploads/` + record.image}
              />
            </>
          );
        }
      },
      {
        key: "name",
        text: "Name",
        className: "name",
        align: "left",
        sortable: true
      },
      {
        key: "flightNumber",
        text: "Flight Number",
        className: "flightNumber",
        align: "left",
        sortable: true
      },
      {
        key: "ownerName",
        text: "Owner Name",
        className: "ownerName",
        align: "left",
        sortable: true
      },
      {
        key: "travel",
        text: "Travel",
        className: "travel",
        align: "left",
        sortable: true
      },
      {
        key: "journeyDate",
        text: "Journey Date",
        className: "date",
        align: "left",
        sortable: true
      },
      {
        key: "departure_time",
        text: "Departure Time",
        className: "date",
        align: "left",
        sortable: true
      },
      {
        key: "action",
        text: "Action",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        cell: record => {
          return (
            <>
              <button
                data-toggle="modal"
                data-target="#update-user-modal"
                className="btn btn-primary btn-sm"
                onClick={() =>
                  this.props.history.push(`/edit-flight/${record.slug}`)
                }
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => this.deleteRecord(record.slug)}
                style={{ marginRight: "5px" }}
              >
                <i className="fa fa-trash"></i>
              </button>
              <button
                className="btn btn-default btn-sm"
                onClick={() =>
                  this.props.history.push(`/seats-details/${record.slug}`)
                }
              >
                <i className="fa fa-eye" />
              </button>
            </>
          );
        }
      }
    ];

    this.config = {
      page_size: 10,
      length_menu: [10, 20, 50],
      filename: "Flightes",
      no_data_text: "No flight found!",
      button: {
        excel: true,
        print: true,
        csv: true
      },
      language: {
        length_menu: "Show _MENU_ result per page",
        filter: "Filter in records...",
        info: "Showing _START_ to _END_ of _TOTAL_ records",
        pagination: {
          first: "First",
          previous: "Previous",
          next: "Next",
          last: "Last"
        }
      },
      show_length_menu: true,
      show_filter: true,
      show_pagination: true,
      show_info: true
    };

    this.state = {
      flightes: [],
      isLoading: true,
      error: ""
    };
  }

  componentDidMount() {
    
    this.fetchAvailableFlightes();
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.flightes === this.state.flightes) {
      this.fetchAvailableFlightes();
    }
  }

  deleteRecord = slug => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async result => {
      if (result.value) {
        const resp = await removeFlight(slug).catch(err => {
          this.setState({ error: err.response.data.error });
        });
        if (resp && resp.status === 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          this.setState({});
        }
      }
    });
  };

  fetchAvailableFlightes = async () => {
    const flightes = await getAllAvailableFlightes().catch(err => {
      this.setState({ error: err.response.data.error, isLoading: false });
    });
    if (flightes && flightes.status === 200) {
      let counter = 1;
      flightes.data.map(flight => {
        flight.journeyDate = moment(flight.journeyDate).format("MMMM Do, YYYY");
        flight.sn = counter;
        counter++;
        flight.ownerName = flight.owner.name;
        flight.travel = flight.travel.name;
        return flight;
      });
      this.setState({ flightes: flightes.data, isLoading: false });
    }
  };

  pageChange = pageData => {
    console.log("OnPageChange", pageData);
  };

  render() {
    return (
      <Layout title="All Flightes > Available flightes">
        <div className="d-flex" id="wrapper">
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <button className="btn btn-link mt-3" id="menu-toggle"></button>
              <button
                className="btn btn-outline-primary float-right mt-3 mr-2"
                data-toggle="modal"
                data-target="#add-user-modal"
                onClick={() => this.props.history.push("/add-flight")}
              >
                {" "}
                Add Flight
              </button>
              <h1 className="mt-2 text-primary">All Available Flightes</h1>
              {this.state.isLoading ? (
                <Loading />
              ) : (
                <ReactDatatable
                  config={this.config}
                  records={this.state.flightes}
                  columns={this.columns}
                  onPageChange={this.pageChange}
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default FlightAvailable;
