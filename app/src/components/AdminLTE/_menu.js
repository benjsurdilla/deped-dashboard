import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { menu } from "../Menu";
import { hasChildren } from "../utils";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { hasAccess } from "../../helpers/common";

export default function App() {
    return menu
        .map((item, key) => <MenuItem key={key} item={item} />);
}

const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
    return (
        <li className="nav-item">
            <a href={item.to} className="nav-link" style={{ display: 'flex' }}>
                <ListItemIcon style={{ color: '#fff', textDecoration: 'none' }}>{item.icon}</ListItemIcon>
                {item.title}
            </a>
        </li>
    );
};

const MultiLevel = ({ item }) => {
    const { items: children } = item;
    const [open, setOpen] = useState(false);
    const location = useLocation();
    if (location.pathname === item.to) {
        setOpen(true);
    }
    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const userState = useSelector(state => state.user)
    return (
        <React.Fragment>
            <li className={`nav-item ${open ? 'menu-open' : ''}`}>
                <a href="#" className={`nav-link ${open ? 'active' : ''}`} style={{ display: 'flex' }}>
                    <ListItemIcon style={{ color: '#fff', textDecoration: 'none' }}>{item.icon}</ListItemIcon>
                    <p>
                        {item.title}
                        <i className="right fas fa-angle-left"></i>
                    </p>
                </a>
                <ul className="nav nav-treeview" onClick={handleClick}>
                    {children.filter(c => c.title !== 'KRA' || hasAccess(userState, 15))
                        .filter(c => c.title !== 'Project' || hasAccess(userState, 16))
                        .filter(c => c.title !== 'TO-KRA' || hasAccess(userState, 18))
                        .filter(c => c.title !== 'Account' || hasAccess(userState, 19))
                        .map((child, key) => (
                            <MenuItem key={key} item={child} />
                        ))}
                </ul>
            </li>
        </React.Fragment>
    );
};
