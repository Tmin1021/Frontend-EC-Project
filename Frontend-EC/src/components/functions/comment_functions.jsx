import BEApi from '../../service/BEApi';

async function fetchComment(product_id, setter = () => {}) {
    if (typeof setter !== 'function') return

    try {
        const res = await BEApi.CommentApi.getByProductId(product_id);
        const data = res.data

        if (data && data.length > 0) {
            // Fetch user info for each comment
            const newData = await Promise.all(
                data.map(async (item) => {
                    const userRes = await BEApi.UserApi.getById(item.user_id)
                    return {
                        ...item,
                        user: userRes.data,
                    }
                })
            )

            setter(newData)
        } else {
            console.warn("No comment found for", product_id)
            setter([])
        }
    } catch (error) {
        console.error("Failed to fetch comment:", error)
    }
}

export {fetchComment}
