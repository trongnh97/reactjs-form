class InternForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      pwd: "",
      image: null,
      copyData: [],
      filterVal: "",
      index: 0,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePwd = this.handleChangePwd.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleChangeName(event) {
    this.setState({ fullName: event.target.value });
    //console.log(this.state.fullName);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePwd(event) {
    this.setState({ pwd: event.target.value });
  }

  uploadImg(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({ image: URL.createObjectURL(img) });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let copyData = this.state.copyData;
    // if (this.state.fullName === "") {
    //   alert("Thiếu tên rồi");
    // }
    // else if (this.state.email === "") {
    //   alert("Thiếu email rồi");
    // }
    // else if(this.state.pwd === ""){
    //   alert("Thiếu mật khẩu rồi")
    // }
    // else {
    //   alert(
    //     "Họ tên: " +
    //       this.state.fullName +
    //       "      " +
    //       "Email: " +
    //       this.state.email +
    //       "      " +
    //       this.state.pwd
    //   );
    copyData.push({
      name: this.state.fullName,
      email: this.state.email,
      pwd: this.state.pwd,
      image: this.state.image,
    });
    this.setState({ copyData });
  }

  handleFilter(event) {
    this.setState({ filterVal: event.target.value });
  }

  handleSort() {
    this.state.copyData.sort((a, b) => a.name.localeCompare(b.name));
    this.setState({});
    //console.log(this.state.copyData);
  }

  deleteItem(index) {
    //console.log(index)
    let row = this.state.copyData;
    row.splice(index, 1);
    this.setState({ index });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChangeName}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={this.state.value}
              onChange={this.handleChangeEmail}
            />
          </label>
          <label>
            Mật khẩu:
            <input
              type="password"
              value={this.state.value}
              onChange={this.handleChangePwd}
            />
          </label>
          <label className="d-flex">
            Up load:
            <input type="file" onChange={this.uploadImg} />
            <div>
              <img src={this.state.image} />
            </div>
          </label>
          <input
            className="btn btn-outline-info"
            type="submit"
            value="Submit"
          />
        </form>
        Tìm kiếm: <input type="search" onChange={this.handleFilter} />
        <table className="table" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => this.handleSort()}
              >
                Họ và tên
              </th>
              <th>Email</th>
              <th>Mật khẩu</th>
              <th>Avatar</th>
              <th>Custom</th>
            </tr>
          </thead>
          <tbody>
            {this.state.copyData
              .filter((valFilter) => {
                return valFilter.name.includes(this.state.filterVal);
              })
              .map((value, index) => {
                return (
                  <tr>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.pwd}</td>
                    <td>
                      <img src={value.image} />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.deleteItem(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

ReactDOM.render(<InternForm />, document.getElementById("root"));
