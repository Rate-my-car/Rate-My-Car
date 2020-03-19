import React, { Profiler } from 'react'
// import {unmountComponentAtNode} from 'react-dom'
import renderer from 'react-test-renderer'
import {HashRouter, Link} from 'react-router-dom'
import ForSale from '../Components/ForSale'
import Form from '../Components/Form'

describe('Routes will work', ()=> {
    //todd 1
    test('will bring you to the dashboard "/"', ()=> {
        const component = renderer.create(
            <HashRouter>
                <Link to='/'/>
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
    //todd 2
    test('will bring you to the for sale page "/ForSale"', ()=> {
        const component = renderer.create(
            <HashRouter>
                <Link to='/ForSale'/>
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
    //todd 3
    test('will bring you to the maps "/maps"', ()=> {
        const component = renderer.create(
            <HashRouter>
                <Link to='/maps'/>
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
    //todd 4
    test('will bring you to the form "/form"', ()=> {
        const component = renderer.create(
            <HashRouter>
                <Link to='/form'/>
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
    //todd 5
    test('will bring you to the profile "/profile"', ()=> {
        const component = renderer.create(
            <HashRouter>
                <Link to='/profile'/>
            </HashRouter>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    //tia 1
    // post for sale
    // Profile
    // maps
    // Form
    // dashboard
})