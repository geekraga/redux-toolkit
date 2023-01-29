import React from 'react';
import { Redirect } from 'react-router-dom';

export default function NoMatchContainer() {
    return <Redirect to="/" />
}
