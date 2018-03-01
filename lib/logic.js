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
function CreateContract(tx) {

    // Get the asset registry for the asset.
    return getAssetRegistry('org.synu.contractnetwork.asserts.Contract')
        .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.update(tx.contract);

        })
        .then(function () {

            // Emit an event for the modified asset.
            var event = getFactory().newEvent('org.synu.contractnetwork.events', 'CreateContractEvent');
            event.contract = tx.contract;
            emit(event);

        });

}
