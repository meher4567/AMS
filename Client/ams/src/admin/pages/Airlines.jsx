import Index1 from '../Airlines/Index1';  // Make sure to import your index component

const Airlines = () => {
    return (
        <div>
            <h2>Manage Airlines</h2>
            <Index1 />  {/* Directly render the corresponding index component */}
        </div>
    );
};

export default Airlines;
