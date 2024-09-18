import React, { useState, useCallback } from 'react';
import {
    Page,
    Card,
    IndexTable,
    ChoiceList,
    Badge,
    IndexFilters,
    LegacyCard,
    useSetIndexFiltersMode,
    useIndexResourceState,
    DropZone,
    Avatar,
    TextContainer,
    Text,
    Box,
    LegacyStack
} from '@shopify/polaris';
 function Index() {
    const [selected, setSelected] = useState(0);
    const disambiguateLabel = (key, value) => {
        switch (key) {
            case "type":
                return value.map((val) => `type: ${val}`).join(", ");
            case "tone":
                return value.map((val) => `tone: ${val}`).join(", ");
            default:
                return value;
        }
    };

    const isEmpty = (value) => {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === "" || value == null;
        }
    };

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const [itemStrings, setItemStrings] = useState([
        "All",
        "Active",
        "Draft",
        "Due",
    ]);

    const deleteView = (index) => {
        const newItemStrings = [...itemStrings];
        newItemStrings.splice(index, 1);
        setItemStrings(newItemStrings);
        setSelected(0);
    };

    const duplicateView = async (name) => {
        setItemStrings([...itemStrings, name]);
        setSelected(itemStrings.length);
        await sleep(1);
        return true;
    };

    const tabs = itemStrings.map((item, index) => ({
        content: item,
        index,
        onAction: () => {},
        id: `${item}-${index}`,
        isLocked: index === 0,
        actions:
            index === 0
                ? []
                : [
                    {
                        type: 'rename',
                        onAction: () => {},
                        onPrimaryAction: async (value) => {
                            const newItemsStrings = tabs.map((item, idx) => {
                                if (idx === index) {
                                    return value;
                                }
                                return item.content;
                            });
                            await sleep(1);
                            setItemStrings(newItemsStrings);
                            return true;
                        },
                    },
                    {
                        type: 'duplicate',
                        onPrimaryAction: async (value) => {
                            await sleep(1);
                            await duplicateView(value);
                            return true;
                        },
                    },
                    {
                        type: 'edit',
                    },
                    {
                        type: 'delete',
                        onPrimaryAction: async () => {
                            await sleep(1);
                            deleteView(index);
                            return true;
                        },
                    },
                ],
    }));

    const onCreateNewView = async (value) => {
        await sleep(500);
        setItemStrings([...itemStrings, value]);
        setSelected(itemStrings.length);
        return true;
    };

    const sortOptions = [
        { label: "Product", value: "product asc", directionLabel: "Ascending" },
        { label: "Product", value: "product desc", directionLabel: "Descending" },
        { label: "Status", value: "tone asc", directionLabel: "A-Z" },
        { label: "Status", value: "tone desc", directionLabel: "Z-A" },
        { label: "Type", value: "type asc", directionLabel: "A-Z" },
        { label: "Type", value: "type desc", directionLabel: "Z-A" },
        { label: "Vendor", value: "vendor asc", directionLabel: "Ascending" },
        { label: "Vendor", value: "vendor desc", directionLabel: "Descending" },
    ];

    const [sortSelected, setSortSelected] = useState(["product asc"]);
    const { mode, setMode } = useSetIndexFiltersMode();

    const onHandleCancel = () => {};
    const onHandleSave = async () => {
        await sleep(1);
        return true;
    };

    const primaryAction = selected === 0
        ? {
            type: "save-as",
            onAction: onCreateNewView,
            disabled: false,
            loading: false,
        }
        : {
            type: "save",
            onAction: onHandleSave,
            disabled: false,
            loading: false,
        };

    const [tone, setStatus] = useState(undefined);
    const [type, setType] = useState(undefined);
    const [queryValue, setQueryValue] = useState("");

    const handleStatusChange = useCallback((value) => setStatus(value), []);
    const handleTypeChange = useCallback((value) => setType(value), []);
    const handleFiltersQueryChange = useCallback((value) => setQueryValue(value), []);
    const handleStatusRemove = useCallback(() => setStatus(undefined), []);
    const handleTypeRemove = useCallback(() => setType(undefined), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
    const handleFiltersClearAll = useCallback(() => {
        handleStatusRemove();
        handleTypeRemove();
        handleQueryValueRemove();
    }, [handleStatusRemove, handleQueryValueRemove, handleTypeRemove]);

    const filters = [
        {
            key: "tone",
            label: "Status",
            filter: (
                <ChoiceList
                    title="tone"
                    titleHidden
                    choices={[
                        { label: "Active", value: "active" },
                        { label: "Draft", value: "draft" },
                        { label: "Archived", value: "archived" },
                    ]}
                    selected={tone || []}
                    onChange={handleStatusChange}
                    allowMultiple
                />
            ),
            shortcut: true,
        },
        {
            key: "type",
            label: "Type",
            filter: (
                <ChoiceList
                    title="Type"
                    titleHidden
                    choices={[
                        { label: "Brew Gear", value: "brew-gear" },
                        { label: "Brew Merch", value: "brew-merch" },
                    ]}
                    selected={type || []}
                    onChange={handleTypeChange}
                    allowMultiple
                />
            ),
            shortcut: true,
        },
    ];

    const appliedFilters = [];
    if (tone && !isEmpty(tone)) {
        const key = "tone";
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, tone),
            onRemove: handleStatusRemove,
        });
    }
    if (type && !isEmpty(type)) {
        const key = "type";
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, type),
            onRemove: handleTypeRemove,
        });
    }

    const products = [
        {
            id: "1020",
            product: "1ZPRESSO | J-MAX Manual Coffee Grinder",
            tone: <Badge tone="success">Active</Badge>,
            inventory: "20 in stock",
            type: "Brew Gear",
            vendor: "Espresso Shot Coffee",
            dropshipsupplier   : 'Steeler',
            warehouseLocation: 'Pakistan',
            subcategory:'T-Shirt',
            quentity:'30',
            unitcosteur:'30 EUR',
            costofdropshippingcarriereur:'9.8 EUR',
            unitcostEGP:'300 EGP',
            unitcostusd:'40 USD',
            costofkgusd:'25.98 USD',
            costofgramUSD:'0.03 USD',
            unitweightGR:'185 gm',
            unitcostincludingweightusd:'9.41 USD',
            unitcostincludingweightegp:'300 EGP',
            crossmargin: '25%',
            finalprice:'300 EGP'
        },
    ];
    const resourceName = {
        singular: "product",
        plural: "products",
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(products);

    const rowMarkup = products.map(({
                                        id, product, tone, inventory, type, vendor, dropshipsupplier, warehouseLocation, subcategory, quentity, unitcosteur,
                                        costofdropshippingcarriereur, unitcostEGP, unitcostusd, costofkgusd, costofgramUSD, unitweightGR,
                                        unitcostincludingweightusd, unitcostincludingweightegp, crossmargin,finalprice
                                    }, index) => (
        <IndexTable.Row
            id={id}
            key={id}
            selected={selectedResources.includes(id)}
            position={index}
        >
            <IndexTable.Cell>
                <div style={{display:"flex",alignItems:"center",gap:'10px'}}>
                <Avatar source={'https://static4.depositphotos.com/1013245/356/i/950/depositphotos_3561159-stock-photo-luxuru-black-leather-jacket-isolated.jpg'} />{product}
                </div>
            </IndexTable.Cell>
            <IndexTable.Cell>{tone}</IndexTable.Cell>
            <IndexTable.Cell>{inventory}</IndexTable.Cell>
            <IndexTable.Cell>{type}</IndexTable.Cell>
            <IndexTable.Cell>{vendor}</IndexTable.Cell>
            <IndexTable.Cell>{dropshipsupplier}</IndexTable.Cell>
            <IndexTable.Cell>{warehouseLocation}</IndexTable.Cell>
            <IndexTable.Cell>{subcategory}</IndexTable.Cell>
            <IndexTable.Cell>{quentity}</IndexTable.Cell>
            <IndexTable.Cell>{unitcosteur}</IndexTable.Cell>
            <IndexTable.Cell>{costofdropshippingcarriereur}</IndexTable.Cell>
            <IndexTable.Cell>{unitcostusd}</IndexTable.Cell>
            <IndexTable.Cell>{unitcostEGP}</IndexTable.Cell>
            <IndexTable.Cell>{costofkgusd}</IndexTable.Cell>
            <IndexTable.Cell>{costofgramUSD}</IndexTable.Cell>
            <IndexTable.Cell>{unitweightGR}</IndexTable.Cell>
            <IndexTable.Cell>{unitcostincludingweightusd}</IndexTable.Cell>
            <IndexTable.Cell>{unitcostincludingweightegp}</IndexTable.Cell>
            <IndexTable.Cell>{crossmargin}</IndexTable.Cell>
            <IndexTable.Cell>{finalprice}</IndexTable.Cell>
        </IndexTable.Row>
    ));

    return (
        <Page>
<Box>
    <Text variant="headingXl"  alignment={"start"}  as="h1" fontWeight="bold">Product</Text>

</Box>
           <Box width={'80%'} padding={'600'}>
               <LegacyCard title="Product Summary" sectioned>
                   <TextContainer>
                       <Text variant="bodyMd" as="h2" fontWeight="semibold">Total Products: {products.length}</Text>
                       <LegacyStack  spacing="tight">
                           <Text variant="bodyMd">Vendor: {products[0].vendor}</Text>
                           <Text variant="bodyMd">Supplier: {products[0].supplier}</Text>
                           <Text variant="bodyMd">Warehouse: {products[0].Warehouse}</Text>
                       </LegacyStack>
                   </TextContainer>
               </LegacyCard>
           </Box>





            <LegacyCard sectioned>
                <IndexFilters
                    sortOptions={sortOptions}
                    sortSelected={sortSelected}
                    queryValue={queryValue}
                    queryPlaceholder="Searching in all"
                    onQueryChange={handleFiltersQueryChange}
                    onQueryClear={handleQueryValueRemove}
                    primaryAction={primaryAction}
                    cancelAction={{
                        onAction: onHandleCancel,
                        disabled: false,
                    }}
                    tabs={tabs}
                    selected={selected}
                    onSortChange={setSortSelected}
                    onSelect={setSelected}
                    canCreateNewView={true}
                    filters={filters}
                    appliedFilters={appliedFilters}
                    onClearAll={handleFiltersClearAll}
                    mode={mode}
                    setMode={setMode}
                />
            </LegacyCard>
            <Card>
                <IndexTable
                    resourceName={resourceName}
                    itemCount={products.length}
                    selectedItemsCount={
                        allResourcesSelected ? "All" : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                    headings={[
                        { title: "Product" },
                        { title: "Status" },
                        { title: "Inventory" },
                        { title: "Type" },
                        { title: "Vendor" },
                        { title: "DropShip Supplier" },
                        { title: 'Warehouse Location' },
                        { title: 'Subcategory' },
                        { title: 'Quantity' },
                        { title: 'Unit Cost' },
                        { title: 'Cost of Dropshipping Carrier (EUR)' },
                        { title: 'Unit Cost (USD)' },
                        { title: 'Unit Cost (EGP)' },
                        { title: 'Cost of Kg (USD)' },
                        { title: 'Cost of Gram (USD )' },
                        { title: 'Unit WeightSupplier (GR)' },
                        { title: 'Unit Cost Including Weight (USD)' },
                        { title: 'Unit Cost Including Weight (EGP)' },
                        { title: 'Cross Margin' },
                        { title: 'Final Price' }
                    ]}
                >
                    {rowMarkup}
                </IndexTable>
            </Card>
        </Page>
    );
}

export default Index;
