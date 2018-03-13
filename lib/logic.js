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
    var factory = getFactory();
  var A_NS = 'org.synu.contractnetwork.assets';
  var P_NS = 'org.synu.contractnetwork.participants';

    var contract = factory.newResource(A_NS, 'Contract', param.Id);



    contract.founder = factory.newRelationship(P_NS, 'EndUser', param.founder.getIdentifier());
    contract.signatures = [];
  param.menbers.forEach(function(item,index){  
        var signature = factory.newResource(A_NS, 'Signature');
        signature.user = factory.newRelationship(P_NS, 'EndUser', item.getIdentifier());
        signature.status = 'WaitSigning';
        contract.signatures.push(signature);
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
