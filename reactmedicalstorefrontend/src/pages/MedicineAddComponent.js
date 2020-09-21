import React from "react";
import { Link } from "react-router-dom";
import APIHandler from "../utils/APIHandler";
import AuthHandler from "../utils/AuthHandler";

class MedicineAddComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companylist: [],
    medicinedetails: [
      { salt_name: "", salt_qty: "", salt_qty_type: "", description: "" },
    ],
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.saveCompanyBankData(
      event.target.bank_account_no.value,
      event.target.ifsc_no.value,
      this.props.match.params.id
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
  }

  componentDidMount() {
    this.LoadCompany();
  }

  async LoadCompany() {
    var apiHandler = new APIHandler();
    var companydata = await apiHandler.fetchCompanyOnly();
    this.setState({ companylist: companydata.data });
  }

  RemoveItem = () => {
    if (this.state.medicinedetails.length !== 1) {
      this.state.medicinedetails.pop(this.state.medicinedetails.length - 1);
    }
    this.setState({});
  };

  handleInput = (event) => {
    console.log(event.target.value);
    console.log(event.target.getAttribute("data-index"));
  };

  AddItem = () => {
    var item = {
      salt_name: "",
      salt_qty: "",
      salt_qty_type: "",
      description: "",
    };
    this.state.medicinedetails.push(item);
    this.setState({});
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE MEDICINE</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Add Medicine</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="email_address">Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter medicine name"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">Medicine Type</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medical_type"
                          name="medical_type"
                          className="form-control"
                          placeholder="Enter medicine type"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">Buy Price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="buy_price"
                          name="buy_price"
                          className="form-control"
                          placeholder="Enter buy price"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">Sell Price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="sell_price"
                          name="sell_price"
                          className="form-control"
                          placeholder="Enter sell price"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">C GST</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="c_gst"
                          name="c_gst"
                          className="form-control"
                          placeholder="Enter C-GST"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">S GST</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="s_gst"
                          name="s_gst"
                          className="form-control"
                          placeholder="Enter S-GST"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">Batch No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="batch_no"
                          name="batch_no"
                          className="form-control"
                          placeholder="Enter batch number"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">Shelf No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="shelf_no"
                          name="shelf_no"
                          className="form-control"
                          placeholder="Enter shelf number"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">Manufacture Date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="mfg_date"
                          name="mfg_date"
                          className="form-control"
                          placeholder="Enter manufactured date"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">Expiry Date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="expire_date"
                          name="expire_date"
                          className="form-control"
                          placeholder="Enter expiry date"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">Description</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Enter description"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">In Stock Total</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="in_stock_total"
                          name="in_stock_total"
                          className="form-control"
                          placeholder="Enter total stocks"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">Quantity in Strip</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="qty_in_strip"
                          name="qty_in_strip"
                          className="form-control"
                          placeholder="Enter quantity in strip"
                        />
                      </div>
                    </div>

                    <label htmlFor="email_address">Company</label>
                    <div className="form-group">
                      <select className="form-control">
                        {this.state.companylist.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-6">
                        <button
                          className="btn btn-block btn-success"
                          onClick={this.AddItem}
                          type="button"
                        >
                          Add details
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          className="btn btn-block btn-danger"
                          onClick={this.RemoveItem}
                          type="button"
                        >
                          Remove details
                        </button>
                      </div>
                    </div>
                    {this.state.medicinedetails.map((item, index) => (
                      <div className="form-group-row">
                        <div className="col-lg-3">
                          <label htmlFor="email_address">Salt Name</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_name"
                              name="salt_name"
                              className="form-control"
                              placeholder="Enter salt name"
                              onChange={this.handleInput}
                              data-index={index}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <label htmlFor="email_address">Salt Quantity</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_qty"
                              name="salt_qty"
                              className="form-control"
                              placeholder="Enter salt quantity"
                              onChange={this.handleInput}
                              data-index={index}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <label htmlFor="email_address">
                            Salt Quantity Type
                          </label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_qty_type"
                              name="salt_qty_type"
                              className="form-control"
                              placeholder="Enter salt quantity type"
                              onChange={this.handleInput}
                              data-index={index}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <label htmlFor="email_address">Description</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="description"
                              name="description"
                              className="form-control"
                              placeholder="Enter description"
                              onChange={this.handleInput}
                              data-index={index}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Add medicine"
                        : "Adding medicine..Please wait..."}
                    </button>
                    <br />
                    {this.state.errorRes === false &&
                    this.state.sendData === true ? (
                      <div className="alert alert-success">
                        <strong>Success!!</strong>
                        {this.state.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errorRes === true &&
                    this.state.sendData === true ? (
                      <div className="alert alert-danger">
                        <strong>Fail!!</strong>
                        {this.state.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default MedicineAddComponent;
