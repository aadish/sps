from django.contrib import admin
from django import forms

import sps.settings
from data.models import Country, State, District, Block, Sublocation, Village, Person, Cluster, SHGBaseLine, SHGProgram, LoanType, LoanSubType
from data.models import Loan, ExpectedReceipt, ActualReceipt


class LoanForm(forms.ModelForm):
    type = forms.ModelChoiceField(LoanType.objects, widget=forms.Select(attrs={'onchange': 'filter();'}))

    class Meta:
        model = Loan

class LoanAdmin(admin.ModelAdmin):
    form = LoanForm

    class Media:
        js = (
                sps.settings.STATIC_URL+ "js/sps.js",

        )

admin.site.register(Country)
admin.site.register(State)
admin.site.register(District)
admin.site.register(Block)
admin.site.register(Sublocation)
admin.site.register(Village)
admin.site.register(Person)
admin.site.register(Cluster)
admin.site.register(SHGBaseLine)
admin.site.register(SHGProgram)
admin.site.register(LoanType)
admin.site.register(LoanSubType)
admin.site.register(Loan, LoanAdmin)
admin.site.register(ExpectedReceipt)
admin.site.register(ActualReceipt)