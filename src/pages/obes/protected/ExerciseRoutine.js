import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../ProjectFeatures/common/headerSlice';
import Exercise from '../../../ProjectFeatures/exercise';


function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Exercise Routine" }))
    }, [])

    return (
        <Exercise />
    )
}

export default InternalPage;