# Transaction broadcast service

The transaction broadcast service consists mainly of the signer and the retry mechanism.

## What kind of errors to retry
Consider retrying requests only with chance of succeeding. In this case, error codes like 503 and 500 has some chance of succeeding and can be retried by the mechanism. On the other hand, error codes like:
- 503: service unavailable
- 501: not implemented
- 401: unauthorized
- 400: bad request

would only waste resources should they be retried without the user changing the request. This can be implemented with a tool like a retry filter to determine if the requests should be retried or not.

Another noteworthy characteristic of retrying request is idempotency. Idempotent means that a process can be repeated multiple times and the result remains the same. For example, a `create` operation might not be idempotent as a repeat operation would result in 2 records being created. 

However, this can be adjusted to be made idempotent by introducing a cryptographic nonce appended to the transaction. Consider the same `create` transaction that has been partially processed before failing with a status 500 error. This request can be retried with the same data and same nonce so that the upstream service is able to determine that this request originates from the same user from the previously failed transaction, thus should be treated as one.

## Backoff
> https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/

Backoff changes (multiplicatively decrease) the wait time between attempts based on the number of previous failures. The theory behind a backoff is that when the upstream service might be overloaded and is rejecting new calls, a simple retry would highly result in yet another failure and even add on to the overload of the busy service. By increasing the delay, more time is given for the service to recover and subsequently process our request successfully.

## Jitter
Even with backoff in place, there might still be a case of spiky retries to the upstream service. Jitter introduce more randomness to the backoff function to further spread out the load.

Some things to take note of:
- max retries (before failing the request)
- base and max delay

## Persistence -- fulfil request even when service restarts
> https://www.ibm.com/support/pages/recovering-failed-transaction-recovery

During a transaction, the transaction information is recorded in a transaction log file. This includes the necessary resources required for that transaction. When the transaction completes, the transaction information should be garbage collected from the logs. 

In the event when the service should be forced-off or restart mid-transaction, such that the transaction did not complete, then on subsequent server restarts, the service should detect the unfinished transaction and attempts to re-establish the resources stored in the logs and attempts to complete the transaction.