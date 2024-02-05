import Cache from "node-cache";

const cache = new Cache({
  stdTTL: 84600,
  deleteOnExpire: true
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const wallet = searchParams.get('wallet')
    if(Array.isArray(wallet) || !wallet ){
      return new Response(`Invalid data`, {
        status: 400,
      })
    }
    const name = cache.get(wallet)
    
    return Response.json({name: name? name : wallet})
  } catch (error) {
    console.error(error);
    return new Response(`Server error`, {
      status: 500,
    })
  }
}

export async function POST(req: Request) {
  try {
    const body = await  req.json()
    if(!body.wallet && !body.name ){
      return new Response(`Invalid data`, {
        status: 400,
      })
    }
    cache.set(body.wallet, body.name);
    return Response.json({success: true})
  } catch (error) {
    console.error(error);
    return new Response(`Server error`, {
      status: 500,
    })
  }
}
