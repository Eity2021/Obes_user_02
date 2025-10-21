import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../ProjectFeatures/common/headerSlice';
import Pdf from '../../../ProjectFeatures/pdf';



function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "PDF" }))
    }, [])

    return (
        <Pdf />
    )
}

export default InternalPage;