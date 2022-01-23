// import {FinalExecutionOutcome} from "near-api-js/src/providers/index";
// import {near, wallet} from "~domain/near/global";
// import {FinalExecutionStatus} from "near-api-js/src/providers/provider";
// import {FinalExecutionStatusBasic} from "near-api-js/lib/providers";
//
// export function tx_status<T>(hash: string): Promise<T> {
//   let isFinishStatus = (status: FinalExecutionStatus | FinalExecutionStatusBasic): status is FinalExecutionStatus=>{
//     let z=  (<FinalExecutionStatus>status);
//     return z.SuccessValue!==undefined || z.Failure!==undefined;
//   }
//   return near.connection.provider.txStatus(hash, wallet.account().accountId)
//     .then(e=>{
//       let status =e.status;
//       if(isFinishStatus(status)) {
//         if(status.Failure) {return Promise.reject()}
//         else {
//           return Promise.resolve(status.SuccessValue)
//           status.SuccessValue
//         }
//       }
//
//     })
//
// }
