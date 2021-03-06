import React, { useEffect } from 'react'
import { MainContainer } from './StudentMenuStyles'
import { StudentMenuButton } from './StudentMenuButton'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateMenuData } from '../../redux/ducks/menu'
import {useHistory} from 'react-router-dom'

export const StudentMenu = () => {
    const menu = useSelector((state) => state.menu)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        console.log(urlParams.get("type"));
        const newMenuData = []
        if(urlParams.has("type")) {
            for (const m of menu.data) {
                if(m.type === urlParams.get("type")) {
                    newMenuData.push({...m, isClicked: true})
                } else {
                    newMenuData.push({...m, isClicked: false})
                }
            }
            dispatch(UpdateMenuData(newMenuData))
        }
    })

    const handleClick = (buttonType) => {
        const newMenuData = []

        for (const m of menu.data) {
            if(m.type === buttonType) {
                newMenuData.push({...m, isClicked: true})
            } else {
                newMenuData.push({...m, isClicked: false})
            }
        }

        dispatch(UpdateMenuData(newMenuData))
        if(buttonType==="homePage") {
            history.push("/student")
        } else {
            history.push(`/student/3dcontent?type=${buttonType}`)
        }
    }

    return (
        <MainContainer>
            {menu.data.map(data => (
                <StudentMenuButton onClickMethod={()=>handleClick(data.type)} isClicked={data.isClicked} text={data.text} />
            ))}
        </MainContainer>
    )
}
