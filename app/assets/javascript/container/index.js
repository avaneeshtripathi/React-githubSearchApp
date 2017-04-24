const Container = React.createClass({
    render () {
        return (
            <section className="container">
                {this.props.children}
            </section>
        );
    },
});

export default Container;
