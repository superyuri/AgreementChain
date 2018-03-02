# Basic Sample Business Network
# org.synu.contractnetwork

> This is the "Hello World" of Hyperledger Composer samples, which demonstrates the core functionality of Hyperledger Composer by changing the value of an asset.

This business network defines:

**Participant**
`EndUser`

**Asset**
`Contract``SealImage``SignTextImage``Template`

**Transaction**
`SampleTransaction`

**Event**
`SampleEvent`

Contract are owned by a EndUser, and the value property on a SampleAsset can be modified by submitting a SampleTransaction. The SampleTransaction emits a SampleEvent that notifies applications of the old and new values for each modified SampleAsset.

To test this Business Network Definition in the **Test** tab:

Create Alice `EndUser` participant:

```
{
  "$class": "org.synu.contractnetwork.participants.EndUser",
  "Id": "Alice@example.org",
  "personInfo": {
    "$class": "org.synu.contractnetwork.participants.Person",
    "title": "Alice Robot",
    "IDCard": "211003199901011234",
    "firstName": "Alice",
    "lastName": "Robot",
    "middleNames": [],
    "contactDetails": {
      "$class": "org.synu.contractnetwork.participants.ContactDetails",
      "email": "Alice@example.org",
      "mobilePhone": "15012345678",
      "address": {
        "$class": "org.synu.contractnetwork.participants.Address",
        "city": "Shenyang",
        "country": "China",
        "street": "Shenyang Normal University",
        "postalCode": "110024"
      }
    }
  },
  "userType": "Personal"
}
```

Create Bob `EndUser` participant:

```
{
  "$class": "org.synu.contractnetwork.participants.EndUser",
  "Id": "Bob@example.org",
  "personInfo": {
    "$class": "org.synu.contractnetwork.participants.Person",
    "title": "Bob Robot",
    "IDCard": "311001199501011349",
    "firstName": "Bob",
    "lastName": "Robot",
    "middleNames": [],
    "contactDetails": {
      "$class": "org.synu.contractnetwork.participants.ContactDetails",
      "email": "Bob@example.org",
      "mobilePhone": "13512345678",
      "address": {
        "$class": "org.synu.contractnetwork.participants.Address",
        "city": "Shenyang",
        "country": "China",
        "street": "Shenyang Normal University",
        "postalCode": "110024"
      }
    }
  },
  "userType": "Personal"
}
```

Create a `SampleAsset` asset:

```
{
  "$class": "org.synu.contract_network.SampleAsset",
  "assetId": "assetId:1",
  "owner": "resource:org.synu.contract_network.SampleParticipant#Toby",
  "value": "original value"
}
```

Submit a `SampleTransaction` transaction:

```
{
  "$class": "org.synu.contract_network.SampleTransaction",
  "asset": "resource:org.synu.contract_network.SampleAsset#assetId:1",
  "newValue": "new value"
}
```

After submitting this transaction, you should now see the transaction in the Transaction Registry and that a `SampleEvent` has been emitted. As a result, the value of the `assetId:1` should now be `new value` in the Asset Registry.

Congratulations!
