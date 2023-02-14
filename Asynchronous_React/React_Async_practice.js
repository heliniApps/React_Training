/* Basic JS Promises */
function basicJsPromises() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, seconds * 1000, "Jane");
        reject("");
    });
}

basicJsPromises().then(
    (name) => console.log(`${name}'s resolve function.`),
    (reason) => console.log("reject function called.")
);

/* Basic JS "fetch" */
fetch("http://api.open-notify.org/astros.json").then(console.log);

const fetchedData = fetch("http://api.open-notify.org/astros.json");
fetchedData.then(console.log);

fetch("http://api.open-notify.org/astros.json")
    .then((response) => response.json())
    .then(console.log);

/* fetchedData
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.people)
    .then((dataArray) => console.log("People Array: ", dataArray)); */

fetchedData
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.people)
    .then((dataArray) => dataArray.map((elem) => elem.name).join(",\n "))
    .then((mappedData) => console.log("mappedData:", mappedData));

/* Basic JS Async & Await */
const awaitDelay = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
};

const asyncAndAwaitTest = async () => {
    console.log("Starting Async function...");

    await awaitDelay(1).then(() => console.log("waiting 1 sec."));

    await awaitDelay(2).then(() => console.log("waiting 2 secs."));

    await awaitDelay(3).then(() => console.log("waiting 3 secs."));
};

asyncAndAwaitTest();

/* Basic JS  Fetch + (async & await) */
async function fetchWithAsyncAndAwait() {
    const data = await fetch("http://api.open-notify.org/astros.json");

    console.log("data:", data);
    console.log("data.json():", data.json().then(console.log));
    /* data.json():
        Promise {<pending>}[[Prototype]]: Promise[[PromiseState]]: "fulfilled"[[PromiseResult]]: undefined
    */
    /* {message: 'success', people: Array(10), number: 10} */

    let jsonData = await data.json();
    console.log("jsonData:", jsonData);

    (await fetch("http://api.open-notify.org/astros.json"))
        .json()
        .then(console.log);
    /* {message: 'success', people: Array(10), number: 10} */
}
fetchWithAsyncAndAwait();

/* %%% React Aynchronous code %%% */

/* Fetching using "useState" & "useEffect" */
function FetchDataUsingHooks() {
    let loginName = "heliniApps";
    // "useState()" hook for handling Data.
    let [data, setData] = useState(null);

    // "useEffect()" to fetch data, only on initial render.
    useEffect(() => {
        fetch(`https://api.github.com/users/${loginName}`)
            .then((response) => response.json())
            .then(setData);
    }, []);

    return (
        <React.Fragment>
            <h1>Data</h1>
            <div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </React.Fragment>
    );
}

// diplay using sub-component
function GitHubUser({ login, name, avatarUrl }) {
    return (
        <div>
            <p>Username: {login}</p>
            <p>Full Name: {name}</p>
            <br />
            <img src={avatarUrl} height={200} width={300} alt={name} />
        </div>
    );
}

function FetchDataUsingHooks2() {
    let loginName = "heliniApps";

    let [data, setData] = useState(null);

    // "useEffect()" to fetch data, only on initial render.
    useEffect(() => {
        fetch(`https://api.github.com/users/${loginName}`)
            .then((response) => response.json())
            .then(setData);
    }, []);

    return (
        <React.Fragment>
            <h1>Data</h1>
            <GitHubUser
                login={data.login}
                name={data.name}
                avatarUrl={data.avatar_url}
            />
        </React.Fragment>
    );
}

/* Different States of data loading */
function GitHubUser2({ login, name, avatarUrl }) {
    return (
        <div>
            <p>Username: {login}</p>
            <p>Full Name: {name}</p>
            <br />
            <img src={avatarUrl} height={200} width={300} alt={name} />
        </div>
    );
}

function FetchDataUsingHooks2() {
    let [data, setData] = useState(null);
    let [error, setError] = useState(null);
    let [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        setLoadingState(true);

        fetch(`https://api.github.com/users/heliniApps`)
            .then((response) => response.json())
            .then(setData)
            .then(() => setLoadingState(false))
            .catch((data) => {
                setError(JSON.stringify(data));
                setLoadingState(false);
            });
    }, []);

    if (loadingState) {
        return <h1>Data Loading... </h1>;
    }
    if (error !== null) {
        return <p>{JSON.stringify(error, null, 2)}</p>;
    }
    if (data === null) {
        return <p>Invalid data source...</p>;
    }
    return (
        <React.Fragment>
            <h1>Data</h1>
            <GitHubUser
                login={data.login}
                name={data.name}
                avatarUrl={data.avatar_url}
            />
        </React.Fragment>
    );
}

/* Fetch data from a GraphQL API */

const query = `
query {
  allLifts {
    name,
    status,
    capacity,
    elevationGain
  }
}
`;

const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
};

function Lift({ name, status, capacity, elevationGain }) {
    return (
        <div key={name}>
            <h3>{name}</h3>
            <p>
                <b>Status:</b> {status}
            </p>
            <p>
                <b>Capacity:</b> {capacity}
            </p>
            <p>
                <b>Elevation Gain:</b> {elevationGain}
            </p>
        </div>
    );
}

function LiftDetails() {
    let [data, setData] = useState(null);
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch("https://snowtooth.moonhighway.com/", opts)
            .then((response) => response.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError);
    }, []);

    if (loading === true) {
        return <h2>Data still loading...</h2>;
    }
    if (error !== null) {
        console.log("came to error: ", error);
        return (
            <div>
                <p>{JSON.stringify(error, null, 2)}</p>
            </div>
        );
    }
    if (data === null) {
        return null;
    }

    console.log(data);

    return (
        <div className="all-lifts">
            {data.data.allLifts.map((lift) => (
                <Lift
                    key={lift.name}
                    name={lift.name}
                    status={lift.status}
                    capacity={lift.capacity}
                    elevationGain={lift.elevationGain}
                />
            ))}
        </div>
    );
}

/* Render Props - Functions as React Component's Attribute Values */

const tahoe_peaks = [
    { name: "Freel", elevation: 10891 },
    { name: "Monument", elevation: 10067 },
    { name: "Pyramid", elevation: 9983 },
    { name: "Tallac", elevation: 9735 },
];

const renderEmpty = () => (
    <div>
        <p>This list is Empty.</p>
    </div>
);

const renderOneItem = (data) => (
    <li key={data[0].name}>
        {data[0].name} - {data[0].elevation}
    </li>
);

const renderAllItems = (data) => {
    return data.map((item) => (
        <li key={item.name}>
            {item.name} - {item.elevation}
        </li>
    ));
};

function List({ data, renderAllItems, renderOneItem, renderEmpty }) {
    if (data === null || data.length <= 0) {
        return renderEmpty();
    }

    let renderingFunction = null;
    if (data.length > 1) {
        renderingFunction = renderAllItems;
    } else if (data.length === 1) {
        renderingFunction = renderOneItem;
    }

    return (
        <div>
            <ul>{renderingFunction(data)}</ul>
        </div>
    );
}

function PeaksList() {
    return (
        <>
            <List
                data={tahoe_peaks}
                renderAllItems={renderAllItems}
                renderOneItem={renderOneItem}
                renderEmpty={renderEmpty}
            />
        </>
    );
}
