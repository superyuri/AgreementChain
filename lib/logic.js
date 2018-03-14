/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Sample transaction processor function.
 * @param {org.synu.contractnetwork.transactions.CreateContract} tx The sample transaction instance.
 * @transaction
 */
function CreateContract(param) {
  // Get the current participant.
  var currentParticipant = getCurrentParticipant();
  var factory = getFactory();
  var A_NS = 'org.synu.contractnetwork.assets';
  var P_NS = 'org.synu.contractnetwork.participants';

  var contract = factory.newResource(A_NS, 'Contract', param.Id);
  contract.founder = factory.newRelationship(P_NS, 'EndUser', currentParticipant.getIdentifier());
  contract.signatures = param.menbers.map(function (item) {
      var signature = factory.newConcept(A_NS, 'Signature');
      signature.user = factory.newRelationship(P_NS, 'EndUser', item.getIdentifier());
      signature.status = 'WaitSigning';
      return signature;
  });


  contract.Title = param.Title;
  contract.Extension = param.Extension;
  contract.Content = param.Content;
  contract.ContentHash = param.ContentHash;
  //Template pass not implement yet
  contract.templateData = param.templateData;
  contract.status = 'WaitSigning';
  contract.SignDeadline = param.SignDeadline;

  // save the order
  return getAssetRegistry(contract.getFullyQualifiedType())
      .then(function (assetRegistry) {
          return assetRegistry.add(contract);
      })
      .then(function () {
          // emit the event
          //var placeOrderEvent = factory.newEvent(namespace, 'PlaceOrderEvent');
          //placeOrderEvent.orderId = order.orderId;
          //placeOrderEvent.vehicleDetails = order.vehicleDetails;
          //placeOrderEvent.options = order.options;
          //placeOrderEvent.orderer = order.orderer;
          //emit(placeOrderEvent);
      });
}

/**
* @param {org.synu.contractnetwork.transactions.SignContract} SignContract.
* @transaction
*/
function SignContract(param) {
  // Get the current participant.
  var currentParticipant = getCurrentParticipant();
  var factory = getFactory();
  var A_NS = 'org.synu.contractnetwork.assets';
  if (param.status == 'WaitSigning' ||
  param.contract.status == 'Effective' ||
  param.contract.status == 'Rejected' ||
  param.contract.status == 'Revoked' ||
  param.contract.status == 'Closed') {
      throw new Error('Status Error');
  }
  if (param.contract.SignDeadline < new Date()) {
      throw new Error('Status Error');
  }
  //param.contract.status = 'Revoked';

  var signedCount = 0;
  var total = param.contract.signatures.length;
  param.contract.signatures.forEach(function(signature){

      if(signature.user.getIdentifier() == currentParticipant.getIdentifier())
      {
          if (signature.status != 'WaitSigning'){
              throw new Error('Already signed');
          }
          signature.status = param.status;
          if("undefined" == typeof param.sealImage)signature.sealImage = factory.newRelationship(A_NS, 'SealImage', param.sealImage.getIdentifier());
          signature.sealImagePos = param.sealImagePos;
          if("undefined" == typeof param.sealImage)signature.signTextImage = factory.newRelationship(A_NS, 'SignTextImage', param.signTextImage.getIdentifier());
          signature.signTextImagePos = param.signTextImagePos;
          signature.SignTime = new Date();
          if(signature.status == 'Signed')
          {
              signedCount++;
          }
      }
      //calc signed number
      else if(signature.status == 'Signed')
      {
          signedCount++;
      }
  });

  if(param.status == 'Reject'){
      param.contract.status = 'Rejected';
  }
  else if(signedCount == total){
      param.contract.status = 'Effective';
  }
  else{
      param.contract.status = 'PartSigned';
  }


  return getAssetRegistry(param.contract.getFullyQualifiedType())
      .then(function (assetRegistry) {
          return assetRegistry.update(param.contract);
      });
}
/**
* @param {org.synu.contractnetwork.transactions.RevokeContract} RevokeContract.
* @transaction
*/
function RevokeContract(param) {
  // Get the current participant.
  //var currentParticipant = getCurrentParticipant();
  //if (currentParticipant.getIdentifier() != param.founder.getIdentifier()) {
  //    throw new Error('You are not founder');
  //}
  var factory = getFactory();
  var A_NS = 'org.synu.contractnetwork.assets';
  if (param.contract.status == 'Effective' ||
  param.contract.status == 'Rejected' ||
  param.contract.status == 'Revoked' ||
  param.contract.status == 'Closed') {
      throw new Error('Status Error');
  }
  if (param.contract.SignDeadline < new Date()) {
      throw new Error('Status Error');
  }
  param.contract.status = 'Revoked';

  return getAssetRegistry(param.contract.getFullyQualifiedType())
      .then(function (assetRegistry) {
          return assetRegistry.update(param.contract);
      });
}
/**
* @param {org.synu.contractnetwork.transactions.TestMethod} transaction.
* @transaction
*/
// function TestMethod() {
//     // Get the current participant.
//     var currentParticipant = getCurrentParticipant();
//     var factory = getFactory();
//     var A_NS = 'org.synu.contractnetwork.assets';
//     var asset = factory.newResource(A_NS, 'TestAsset', currentParticipant.getIdentifier());

//     return getAssetRegistry(asset.getFullyQualifiedType())
//         .then(function (assetRegistry) {
//             return assetRegistry.add(asset);
//         });
// }
