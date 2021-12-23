use http::status::StatusCode;
use serde::Serialize;
use std::convert::Infallible;
use warp::filters::body::BodyDeserializeError;
use warp::reject::{MethodNotAllowed, Rejection};
use warp::reply::{json, with_status as status, Json, Reply};

// Error message container struct (the `message` field makes it JSON serializable)
#[derive(Serialize)]
struct Error {
    message: String,
}

impl Error {
    fn new(msg: &str) -> Self {
        Self {
            message: msg.to_owned(),
        }
    }

    // Simple 404
    fn not_found() -> Json {
        Self::new("not found").as_json()
    }

    // 400 + specific error message
    fn body_deserialization(err: &BodyDeserializeError) -> Json {
        Self::new(&err.to_string()).as_json()
    }

    // 500
    fn unknown() -> Json {
        Self::new("unknown").as_json()
    }

    // 405
    fn method_not_allowed() -> Json {
        Self::new("method not allowed").as_json()
    }

    // JSON helper
    fn as_json(&self) -> Json {
        json(self)
    }
}

// Error handling logic for Warp
pub(crate) async fn handle_err(err: Rejection) -> Result<impl Reply, Infallible> {
    // TODO: see if a match statement can replace this logic
    let result = if err.is_not_found() {
        status(Error::not_found(), StatusCode::NOT_FOUND)
    } else if err.find::<MethodNotAllowed>().is_some() {
        status(Error::method_not_allowed(), StatusCode::METHOD_NOT_ALLOWED)
    } else if let Some(e) = err.find::<BodyDeserializeError>() {
        status(Error::body_deserialization(e), StatusCode::BAD_REQUEST)
    } else {
        status(Error::unknown(), StatusCode::INTERNAL_SERVER_ERROR)
    };

    Ok(result)
}
