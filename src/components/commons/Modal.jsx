var ModalOne = React.createClass({
    getInitialState: function() {
        return {
            value: ""
        };
    },

    componentDidMount: function () {
        this.$el = $(this.getDOMNode());
        this.$el.on("hidden.bs.modal", this.reset);

        emitter.on(constants.changed, function() {
            this.$el.modal("hide");
        }.bind(this));
    },

    componentWillUnmount: function() {
        emitter.off(constants.changed);
    },

    show: function () {
        this.$el.modal("show");
    },

    reset: function() {
        this.setState({ value: "" });
    },

    save: function() {
        dispatcher.dispatch({ type: constants.create, content: { name: this.state.value, isComplete: false }});
    },

    onChange: function(e) {
        this.setState({ value: e.target.value });
    },

    render: function() {
        return <div className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <h2 className="modal-title">New Task</h2>
                    </div>
                    <div className="modal-body">
                        <input placeholder="Task name..." type="text" value={this.state.value} onChange={this.onChange} />
                    </div>
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col col-md-12">
                                <button type="button" className="btn btn-primary pull-right" onClick={this.save}>Save</button>
                                <button type="button" className="btn btn-default pull-right spacing-right" onClick={this.reset} data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
});

class ModalExample extends React.Component {
    modalStyle() {
        return {
            position: 'fixed',
            zIndex: 1040,
            top: 0, bottom: 0, left: 0, right: 0
        }
    }

    backdropStyle(){
        var modalStyle = this.modalStyle();
        return {
            modalStyle,
            zIndex: 'auto',
            backgroundColor: '#000',
            opacity: 0.5
        }
    }

    dialogStyle() {
        // we use some psuedo random coords so nested modals
        // don't sit right on top of each other.
        let top = 50 + 4;
        let left = 50 + 9;

        return {
            position: 'absolute',
            width: 400,
            top: top + '%', left: left + '%',
            transform: `translate(-${top}%, -${left}%)`,
            border: '1px solid #e5e5e5',
            backgroundColor: 'white',
            boxShadow: '0 5px 15px rgba(0,0,0,.5)',
            padding: 20
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    render() {
        return (
            <div>
                <Button onClick={this.open}>
                    Open Modal
                </Button>
                <p>Click to get the full Modal experience!</p>

                <Modal
                    aria-labelledby='modal-label'
                    style={this.modalStyle()}
                    backdropStyle={this.backdropStyle()}
                    show={this.state.showModal}
                    onHide={this.close}
                >
                    <div style={this.dialogStyle()}>
                        <h4 id='modal-label'>Text in a modal</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                    </div>
                </Modal>
            </div>
        )
    }
}


export default ModalOne