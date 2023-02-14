import { Link, Outlet } from "react-router-dom";

function Home() {
    return (
        <div>
            <nav>
                <Link to="/about">About Us | </Link>
                <Link to="/about/history">History | </Link>
                <Link to="/about/current-ceo">Current CEO | </Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <h2>Home Page</h2>
        </div>
    );
}

export function About() {
    return (
        <div>
            <nav>
                <Link to="/">Home | </Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <h2>About Us</h2>
            <Outlet />
        </div>
    );
}

export function Contact() {
    return (
        <div>
            <nav>
                <Link to="/">Home | </Link>
                <Link to="/about">About Us | </Link>
                <Link to="/about/history">History | </Link>
                <Link to="/about/current-ceo">Current CEO | </Link>
            </nav>
            <h2>Contact</h2>
        </div>
    );
}

export function History() {
    return (
        <div>
            <nav>
                <Link to="/">Home | </Link>
                <Link to="/about">About Us | </Link>
                <Link to="/about/current-ceo">Current CEO</Link>
            </nav>
            <h2>Company History</h2>
        </div>
    );
}

export function CurrentCEO() {
    return (
        <div>
            <nav>
                <Link to="/">Home | </Link>
                <Link to="/about">About Us | </Link>
                <Link to="/about/history">History</Link>
            </nav>
            <h2>Current CEO of the Company.</h2>
        </div>
    );
}

function RouterNavigationTest() {
    return (
        <>
            <Home />
        </>
    );
}
