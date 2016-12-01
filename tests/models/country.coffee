
mongoose = require 'mongoose'

CountrySchema = new mongoose.Schema(
    countryCode:
        type: String,
        require: true,
        trim: true
    countryName:
        type: String,
        require: true,
        trim: true
    throwError:
        type: Boolean,
        default: false
)

validateCountryCodeSize = (done) ->
    if @countryCode.length != 2
        done new Error('countryCode must be 2 characters long')
    else
        done()

throwOccasionalError = (done) ->
    if @throwError == true
      done new Error("throwing forced error")
    else
      done()

CountrySchema.pre 'save', validateCountryCodeSize
CountrySchema.pre 'save', throwOccasionalError

mongoose.model 'Country', CountrySchema
