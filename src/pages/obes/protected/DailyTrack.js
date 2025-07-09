import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../ProjectFeatures/common/headerSlice';
import Daily from '../../../ProjectFeatures/daily/Daily';


function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Daily Track" }))
    }, [])

    return (
        <Daily />
    )
}

export default InternalPage;