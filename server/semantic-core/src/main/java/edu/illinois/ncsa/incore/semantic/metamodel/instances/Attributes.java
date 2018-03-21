
package edu.illinois.ncsa.incore.semantic.metamodel.instances;

import edu.illinois.ncsa.incore.semantic.metamodel.attributes.MonetaryAttribute;
import edu.illinois.ncsa.incore.semantic.metamodel.attributes.UnitAttribute;
import edu.illinois.ncsa.incore.semantic.units.instances.ImperialUnits;

import javax.money.Monetary;

public final class Attributes {
    public final static UnitAttribute<Integer> sq_foot = new UnitAttribute<>();
    public final static MonetaryAttribute<Double> appr_bldg = new MonetaryAttribute<>();

    private Attributes() {}

    static {
        sq_foot.unit = ImperialUnits.squareFoot;
        sq_foot.description = "total building area in square feet";
        sq_foot.name = "sq_foot";
        sq_foot.conceptReference = Concepts.buildingArea;
        // display resourceName?

        appr_bldg.conceptReference = Concepts.appraisedBuildingValue;
        appr_bldg.currency = Monetary.getCurrency("USD");
        appr_bldg.fieldName = "appr_bldg";
        appr_bldg.description = "Appraised Building Value";
        appr_bldg.isNullable = true;
        appr_bldg.isUnique = false;
    }
}
